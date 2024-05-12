'use strict';

//*Essential imports
import { checkFieldValueExistsInDB, removeLoader, userExistInFireAuth, signOutFirebaseAuth, showNotification} from './admin-modules';

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
  removeLoader(document.body);
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