import * as React from 'react'
import validProp from '@emotion/is-prop-valid'

export interface IconProps extends React.PropsWithRef<React.SVGProps<SVGSVGElement>> {
  size?: number | string
  title?: string | null
}

interface BaseIconProps {
  iconAttrs: React.SVGProps<SVGSVGElement>
  iconViewBox: string
  iconVerticalAlign: string
}

function isValidProp(key: string): key is keyof React.SVGProps<SVGSVGElement> {
  return validProp(key)
}

function filterSVGProps(props: IconProps): React.SVGProps<SVGSVGElement> {
  return (Object.keys(props) as Array<keyof (IconProps)>).reduce(
    (p, k) => {
      if (isValidProp(k)) {
        // hack to satisfy TypeScript complexity
        ;(p as any)[k] = props[k]
      }
      return p
    },
    {} as React.SVGProps<SVGSVGElement>,
  )
}

export const BaseIcon = React.forwardRef<SVGSVGElement, IconProps & BaseIconProps>(
  (props, ref) => {
    const {children, iconAttrs, iconVerticalAlign, iconViewBox, size, title, ...otherProps} = props

    const iconProps: React.SVGProps<SVGSVGElement> = {
      viewBox: iconViewBox,
      height: props.height !== undefined ? props.height : size,
      width: props.width !== undefined ? props.width : size,
      'aria-hidden': title == null ? 'true' : undefined,
      focusable: 'false',
      role: title != null ? 'img' : undefined,
      ...iconAttrs,
    }

    const svgProps = filterSVGProps(otherProps)

    return (
      <svg {...iconProps} {...svgProps} ref={ref}>
        {title && <title key="icon-title">{title}</title>}
        {children}
      </svg>
    )
  },
)
