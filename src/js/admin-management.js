"use strict";

//* Esential Imports
import Swal from "sweetalert2";
import {
  checkFieldValueExistsInDB,
  createDocumentInFirestore,
  deleteDocumentFromFirestore,
  getAllFirestoreDocuments,
  getFirestoreDocument,
  updateFirestoreDocument,
} from "./firebase-modules";
import { showAlert, showConfirmationDialog } from "./utility-modules";

//* Variables
const headerMsgForm = document.getElementById("edit-notification-input-con");
const addNewCouponBtn = document.getElementById("addNewCouponBtn");
const couponCodesCon = document.getElementById("coupon-codes-con");
let couponCode;
let couponDiscount;

//*Functions
const loadCurrentNotification = async () => {
  const currentNotification = await getFirestoreDocument(
    "storeManagement",
    "headerNotificationMsg"
  );
  headerMsgForm.input.value = currentNotification.value;
  headerMsgForm.classList.remove("skeleton-loading");
};
const addCouponToDom = (couponData, docID) => {
  couponCodesCon.innerHTML += `<div class="coupon ${docID}" data-docid=${docID}>
    <div class="details-column">
        <p class="coupon-code">
            ${couponData.code}
        </p>

        <p class="discount">
            Rs. <span>${couponData.discount}</span>OFF
        </p>
    </div>
    <div class="cta-column">
        <button class="couponDeleteBtn" data-docID="${docID}">
            <svg data-docID="${docID}" xmlns="http://www.w3.org/2000/svg" width="1.7rem" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path data-docID="${docID}" d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
              </svg>
        </button>
    </div>
</div>`;
};
const loadAllCoupons = async () => {
  const allCoupons = await getAllFirestoreDocuments("coupons");
  const logElem = document.getElementById("couponLogElem");

  logElem.innerHTML = "";
  if (allCoupons.docs.length) {
    allCoupons.docs.forEach((coupon) => {
      addCouponToDom(coupon.data(), coupon.id);
    });
  } else {
    logElem.innerHTML = `Create a coupon to get started`;
  }
};
async function deleteCoupon(docID) {
  const confirmationDialog = await showConfirmationDialog(
    "question",
    "Are you sure",
    "Do you wana delete this coupon?",
    "Delete",
    "Cancel"
  );
  if (confirmationDialog.isConfirmed) {
    const couponElem = document.querySelector(`[data-docid="${docID}"]`);
    couponElem.remove();
    const deleteTask = await deleteDocumentFromFirestore("coupons", docID);
  }
}

//* EventListners
headerMsgForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newNotfication = headerMsgForm.input.value;
  headerMsgForm.input.value = "Updating..";
  const updateTask = await updateFirestoreDocument(
    "storeManagement",
    "headerNotificationMsg",
    { value: newNotfication }
  );
  headerMsgForm.input.value = "Updated!";
  setTimeout(() => {
    headerMsgForm.input.value = newNotfication;
  }, 2000);
});

addNewCouponBtn.addEventListener("click", async (e) => {
  await Swal.fire({
    allowOutsideClick: false,
    title: "Enter coupon code",
    input: "text",
    inputLabel: "Enter coupon code",
    showCancelButton: true,
    inputValidator: async (value) => {
      if (!value) {
        return "You must enter a code!";
      } else {
        couponCode = value;
        Swal.fire({
          title: "",
          text: "Validating your coupon...",
          buttons: false,
          closeOnClickOutside: false,
          // timer: 3000,
          icon: "info",
          showConfirmButton: false,
        });

        const checkTask = await checkFieldValueExistsInDB(
          "coupons",
          "code",
          value.trim()
        );
        if (!checkTask) {
          await Swal.fire({
            allowOutsideClick: false,
            title: "Enter coupon discount (in amount)",
            input: "number",
            inputLabel: "Enter coupon discount value",
            showCancelButton: true,
            inputValidator: async (value) => {
              couponDiscount = parseInt(value);
              if (!value) {
                return "You must enter something!";
              } else {
                const dataObj = { code: couponCode, discount: couponDiscount };
                const createTask = await createDocumentInFirestore(
                  "coupons",
                  dataObj
                );
                showAlert(
                  "success",
                  "Success",
                  "new coupon created successfully",
                  "Nice!"
                ).then((Response) => {
                  if (Response.isConfirmed) {
                    window.location.reload();
                  }
                });
              }
            },
          });
        } else {
          showAlert(
            "error",
            "coupon already exist",
            "Try some other code",
            "Alright"
          );
        }
      }
    },
  });
});

(async () => {
  await loadCurrentNotification();
  await loadAllCoupons();

  const allCouponDelBtns = document.querySelectorAll(".couponDeleteBtn");
  allCouponDelBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log(e.target.dataset);
      deleteCoupon(e.target.dataset.docid);
    });
  });
})();
//* others.
