'use strict';

//*Essential imports
import { checkFieldValueExistsInDB, userExistInFireAuth, signOutFirebaseAuth} from "./firebase-modules";
import { showNotification} from "./utility-modules";

//*variabls and elems
const userProfile = document.getElementById('userProfile');
const logOutBtn = document.getElementById('logOutBtn');


//*Functions
(async ()=>{
      const userCredentials = await userExistInFireAuth()
      if(userCredentials !== false){

        const userIsAdmin = await checkFieldValueExistsInDB("Admins","Email",userCredentials.email)
        if(userIsAdmin) {          
          allowEntry(userCredentials)
        }else{
          window.location.replace("/admin/unauthorized")
        }
      }else{
        window.location.replace("/admin/login")
      }
})();

function allowEntry(userCredentials){
  userProfile.src = userCredentials.photoURL
}

//*Event listners
logOutBtn.addEventListener("click",async (e)=>{
  e.preventDefault();
  const signOutTask = await signOutFirebaseAuth();
  if(signOutTask){
    await showNotification("success","signed out sucessfully")
      window.location.replace("/admin/login")

  }
})