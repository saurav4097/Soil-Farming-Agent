/* Firebase Configuration */
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Login functionality
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.querySelector("input[name='email']").value;
    const password = document.querySelector("input[name='password']").value;
    
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "user.html";
        })
        .catch(error => {
            alert("Login Failed: " + error.message);
        });
});

// Posting Soil Details
document.getElementById("soilForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    const soilType = document.getElementById("soilType").value;
    const soilDesc = document.getElementById("soilDesc").value;
    const soilCrops = document.getElementById("soilCrops").value;

    db.collection("soils").add({
        type: soilType,
        description: soilDesc,
        crops: soilCrops.split(",")
    }).then(() => {
        alert("Soil details added successfully");
        document.getElementById("soilForm").reset();
    }).catch(error => alert("Error: " + error.message));
});

// Posting Distributor Details
document.getElementById("distributorForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    const distName = document.getElementById("distName").value;
    const distLocation = document.getElementById("distLocation").value;
    const distCrops = document.getElementById("distCrops").value;
    const distContact = document.getElementById("distContact").value;

    db.collection("distributors").add({
        name: distName,
        location: distLocation,
        crops: distCrops.split(","),
        contact: distContact
    }).then(() => {
        alert("Distributor details added successfully");
        document.getElementById("distributorForm").reset();
    }).catch(error => alert("Error: " + error.message));
});

// Fetch and display soil details on user page
function fetchSoil() {
    db.collection("soils").get().then(snapshot => {
        document.getElementById("soilList").innerHTML = "";
        snapshot.forEach(doc => {
            document.getElementById("soilList").innerHTML += `<li>${doc.data().type}: ${doc.data().description}</li>`;
        });
    });
}

// Fetch and display distributor details on user page
function fetchDistributors() {
    db.collection("distributors").get().then(snapshot => {
        document.getElementById("distributorList").innerHTML = "";
        snapshot.forEach(doc => {
            document.getElementById("distributorList").innerHTML += `<li>${doc.data().name}: ${doc.data().location}, Contact: ${doc.data().contact}</li>`;
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    fetchSoil();
    fetchDistributors();
});
