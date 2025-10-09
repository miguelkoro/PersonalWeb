import Card from "./Card";
import CardStudies from "./CardStudies";

const Education = (props) => {
    const { t } = props;
    return (
        <div  id="education" style={{ padding: '4rem 0', textAlign: 'left' }}>
            <h2 className="about-me-title">{t('i.education')}</h2>
            <p className="education-subtitle">

                {t('i.educationText')}
            </p>
            <div className="education-cards">
                <CardStudies />
            </div>
        </div>
    );
};

export default Education;