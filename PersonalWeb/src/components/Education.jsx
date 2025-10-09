import Card from "./Card";
import CardStudies from "./CardStudies";

const Education = (props) => {
    const { t } = props;
    return (
        <div  id="education" style={{ padding: '4rem 0', textAlign: 'left', paddingBottom: '6rem' }}>
            <h2 className="about-me-title">{t('i.education')}</h2>
            <p className="education-subtitle">

                {t('i.educationText')}
            </p>
            <div className="card-studies-management-wrapper">
                <CardStudies degreeType={t('i.cardUniversityDegree')} degreeName={t('i.cardUniversityDegreeTitle')} center={t('i.cardUniversityDegreeCenter')} logo={"/UPM_logo.png"} description={t('i.cardUniversityDegreeDescription')} />
                <CardStudies degreeType={t('i.cardProfessionalDegree')} degreeName={t('i.cardProfessionalDegreeTitle')} center={t('i.cardProfessionalDegreeCenter')} logo={"/centro_afuera_logo.png"} description={t('i.cardProfessionalDegreeDescription')} />
                <CardStudies degreeType={t('i.cardProfessionalDegree')} degreeName={t('i.cardProfessionalDegreeTitle2')} center={t('i.cardProfessionalDegreeCenter')} logo={"/centro_afuera_logo.png"} description={t('i.cardProfessionalDegreeDescription2')} />
                <CardStudies degreeType={t('i.cardProfessionalDegree2')} degreeName={t('i.cardProfessionalDegreeTitle3')} center={t('i.cardProfessionalDegreeCenter')} logo={"/centro_afuera_logo.png"} description={t('i.cardProfessionalDegreeDescription3')} />
                <CardStudies degreeType={t('i.cardBootcampDegree')} degreeName={t('i.cardBootcampDegreeTitle')} center={t('i.cardBootcampDegreeCenter')} logo={"/azpe_logo.png"} description={t('i.cardBootcampDegreeDescription')} background={true} />
            </div>
        </div>
    );
};

export default Education;