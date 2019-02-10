import {Constants} from "expo"

const ifNotch = () => {
    return Constants.statusBarHeight > 20 ? true : false
}

export default ifNotch
