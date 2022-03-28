// import routes from 'constants/routes'
import { RefObject } from 'react'
import { transformer } from './'


const openLink = <T>(query: T) => {
    // return `${window.location.origin}${routes.redirectGoogle.path}${transformer.urlSearchParams(query)}`
}

class RootElementHandler {
    private rootElementRef: RefObject<HTMLDivElement> | null = null
    setRef(ref: RefObject<HTMLDivElement>) {
        this.rootElementRef = ref
    }
    scrollToTop = () => {
        if (this.rootElementRef) {
            scrollToTop(this.rootElementRef)
        }
    }
}
const rootElement = new RootElementHandler()

const scrollToTop = (divRef: RefObject<HTMLDivElement>) => {
    if (divRef.current) {
        divRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'start',
        })
    }
}

const exportedObject = {
    openLink,
    scrollToTop,
    rootElement
}

export default exportedObject