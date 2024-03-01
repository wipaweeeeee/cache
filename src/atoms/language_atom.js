import { atom, useRecoilState } from "recoil"

const langState = atom({
    key: 'languageState',
    default: { lang: 'en'}
})

function useLangState() {
    const [ { lang }, setLangState ] = useRecoilState(langState);

    return [ { lang }, setLangState ];
}

export default useLangState;