import '../auth/user.js';
import {
    getProfile,
    getUser,
    updateProfile,
} from '../fetch-utils.js';

const errorDisplay = document.getElementById('error-display');
const profileForm = document.getElementById('profile-form');
const updateButton = profileForm.querySelector('button');
const userNameInput = profileForm.querySelector('[name=user_name]');
const bioTextArea = profileForm.querySelector('[name=bio]');
// const avatarInput = profileForm.querySelector('[name=avatar_url]');
// const preview = document.getElementById('preview');

const user = getUser();

let error = null;
let profile = null;

// > Load Profile
window.addEventListener('load', async () => {
    const response = await getProfile(user.id);
    error = response.error;
    profile = response.data;

    if (error) {
        displayError();
    }

    if (profile) {
        displayProfile();
    }
});

// avatarInput.addEventListener('change', () => {
//     const file = avatarInput.files[0];
//     preview.src = URL.createObjectURL(file);
// });

profileForm.addEventListener('submit', async (e) => {
    // keep the form from changing the browser page
    e.preventDefault();

    // niceties for "saving" and errors:
    // reset the error
    errorDisplay.textContent = '';
    // disabled button and change to "saving..."
    updateButton.disabled = true;

    // create a form data object for easy access to form values
    const formData = new FormData(profileForm);

    // > Profile Update Object
    const profileUpdate = {
        user_name: formData.get('user_name'),
        bio: formData.get('bio'),
    };

    // > Upload Avatar

    // > Update Profile
    const response = await updateProfile(profileUpdate);

    error = response.error;

    // did it work?
    if (error) {
        // display the error
        displayError();
        // reset the button to be active
        updateButton.disabled = false;
    } else {
        location.assign('../');
    }
});

function displayError() {
    errorDisplay.textContent = error.message;
}

function displayProfile() {
    userNameInput.value = profile.user_name;
    bioTextArea.value = profile.bio;
    // load preview of existing profile
    // if (profile.avatar_url) {
    //     preview.src = profile.avatar_url;
    // }
}
