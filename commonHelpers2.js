import"./assets/styles-0d9091d8.js";import{i}from"./assets/vendor-e449e461.js";import{e as l}from"./assets/icon-error-e83c2919.js";const m="/goit-js-hw-10/assets/success-286069d5.svg",c={success:m,error:l},t=document.querySelector("form.form");t.addEventListener("submit",o=>{o.preventDefault();const e=t.elements.delay.value,r=t.elements.state.value;a(r,e)});function a(o,e){console.log("createPromise",o,e),new Promise((s,n)=>{setTimeout(()=>{switch(o){case"fulfilled":s("Success! Value passed to resolve function");break;case"rejected":n("Error! Error passed to reject function");break}},e)}).then(s=>{console.log(s),i.success({iconUrl:c.success,timeout:5e3,position:"topRight",title:"Fulfilled",message:`promise in ${e}ms`})}).catch(s=>{console.log(s),i.error({iconUrl:c.error,timeout:5e3,position:"topRight",title:"Rejected",message:` promise in ${e}ms`})}).finally(()=>console.log("Promise settled"))}
//# sourceMappingURL=commonHelpers2.js.map