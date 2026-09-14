import { Link, type LinkProps } from 'react-router-dom'

interface AnchorLinkProps extends Omit<LinkProps, 'to'> {
  readonly section: string
}

/**
 * Link to a landing-page section that works from any route without a full
 * reload. Router links don't scroll to hashes on their own — ScrollManager
 * in App.tsx watches the location and performs the scroll.
 */
export default function AnchorLink({ section, ...rest }: AnchorLinkProps) {
  return <Link to={`/#${section}`} {...rest} />
}
