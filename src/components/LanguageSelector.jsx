import './LanguageSelector.css';

const FlagButton = ({ name, flag, code, setLanguage, selectedLanguage }) => {
    return (
        <img src={`https://flagcdn.com/${flag}.svg`} 
             width="30"
             height="20" 
             alt={name}
             className={ code === selectedLanguage ? 'active' : ''}
             onClick={() => setLanguage(code)}/>
    )
}

const LanguageSelector = ({ preferedLanguage, setPreferedLanguage }) => {
    const languages = ['ja', 'en', 'es', 'fr', 'pt-br'];
    const languages_name = ['Japanese', 'English', 'Spanish', 'French', 'Portuguese'];
    const flags = ['jp', 'gb', 'es', 'fr', 'pt'];
    return (
        <div className='language-selector'>
            { languages.map((l, i) => (
                <FlagButton key={i} 
                            name={languages_name[i]} 
                            flag ={flags[i]} 
                            code={l} 
                            setLanguage={setPreferedLanguage} 
                            selectedLanguage={preferedLanguage}/>)) 
            }
        </div>
    )
}

export default LanguageSelector