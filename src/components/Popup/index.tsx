import { MutableRefObject, ReactNode, useEffect, useRef } from 'react'

import { classNames } from '@helpers/classNames/classNames'

import { stopPropagation } from '@shared/lib/events/events'
import Portal from '@shared/ui/Portal'
import CloseIcon from '@shared/ui/icons/Close'

import { Text, TextVariants } from '../Text/Text'

import cls from './Popup.module.scss'

type Props = {
  onClose?: () => void
  getRef?: (ref: HTMLDivElement | null) => void
  getWrapper?: (ref: HTMLDivElement | null) => void
  displayClose?: boolean
  className?: string
  title?: string
  maxWidth?: number
  getHide?: (v: () => void) => void
  children?: ReactNode
}

export const Popup: React.FC<Props> = (props) => {
  const {
    children,
    onClose,
    className,
    title,
    getRef,
    displayClose = true,
    maxWidth,
    getHide,
    getWrapper,
  } = props

  const overlay = useRef(null) as MutableRefObject<HTMLDivElement | null>

  const hideModal = () => {
    if (overlay.current && onClose) {
      const target = overlay.current as HTMLDivElement
      target.classList.add(cls.hidePopup)
      setTimeout(() => {
        onClose()
      }, 300)
    }
  }

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        hideModal()
      }
    }

    if (getHide) {
      getHide(hideModal)
    }

    document.addEventListener('keydown', listener, false)
    return () => {
      document.removeEventListener('keydown', listener, false)
    }
  }, [])

  return (
    <Portal>
      <div
        onClick={hideModal}
        ref={(r) => {
          overlay.current = r
          getWrapper?.(r)
        }}
        className={classNames(cls.overlay, {}, [className])}
      >
        <div onClick={stopPropagation} className={cls.popup} style={{ maxWidth }}>
          {(title || !!onClose) && displayClose && (
            <div className={cls.popupHead}>
              {title && <Text variant={TextVariants.XL2}>{title}</Text>}
              {!!onClose && (
                <div className={cls.closeBtn}>
                  <CloseIcon onClick={hideModal} />
                </div>
              )}
            </div>
          )}
          <div className={cls.content} ref={(ref) => getRef?.(ref)}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}