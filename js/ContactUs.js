import yasminImage from "../Assets/yasmin.jpeg";
import YostenaImage from "../Assets/yostena.jpeg";
import MariamImage from "../Assets/mariam.jpeg";
import sohailaImage from "../Assets/sohaila.jpeg";
// import AyaImage from "../Assets/aya.jpg";
// import EsraaImage from "../Assets/esraa.jpg";
export default function ContactUs() {
    return (
        <div className="ContactUs">
            <h1>Get Support from Our Team</h1>
        <div className="ContactUsContent">
            <a href="https://www.linkedin.com/in/yasmin-gamal-ali-3353a6232?trk=contact-info">
             <div>
                <img src={yasminImage} alt="yasmin"></img>
                <h3>Yasmin Gamail</h3>       
             </div>
             </a>
             <a href="https://www.linkedin.com/in/youstina-william-1153792a2?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
             <div>
                <img src={YostenaImage} alt="yostena"></img>
                <h3>Yostena Willim</h3>
             </div>
             </a>
             <a href="https://www.linkedin.com/in/sohaila-elbadry-259513233?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
             <div>
                <img src={sohailaImage} alt='sohaila'></img>
                <h3>sohaila Wael</h3>
             </div>
             </a>
             <a href="https://www.linkedin.com/in/mariam-samuel-8132872b1/">
             <div>
                <img src={MariamImage} alt="mariam"></img>
                <h3>Mariam Samuel</h3>
             </div>
             </a>
             <div>
                <img src='/'></img>
                <h3>Esraa Khamis</h3>
             </div>
             <div>
                <img src='/'></img>
                <h3>Aya Ahmed</h3>
             </div>
        </div>
        </div>
    )

}
