//*Esential imports
import { addLoader, showAlert, storeObjToDB} from './admin-modules'

//*Variables
const contactForm = document.getElementById('contactForm');

//*Functions
const handleFormSubmission = async ()=>{
    const allFields = [...document.querySelectorAll('[data-fieldName]')];
    
    const formDataObj = {}
    allFields.forEach(field =>{
        const fieldName = field.dataset.fieldname
        const fieldValue = field.value;
        formDataObj[fieldName] = fieldValue;
    })
    contactForm.innerHTML=''
    addLoader(contactForm, false, false)

    
    const storeTask = await storeObjToDB("contactMessages",formDataObj);
    showAlert("success","Thanks for reaching out 👀","We'll get back to you shortly!","Continue shopping").then(Response =>{
        window.location.replace("../products")
    })
}

//*EventListners
contactForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    handleFormSubmission()
})