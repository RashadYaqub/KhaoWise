/* app.js */

/* ------------------ Global Variables ------------------ */
let currentSlide = 0;              // For onboarding slides
const screenStack = [];            // For back-button navigation

/* 
  Utility function to show/hide screens by ID.
  Also toggles bottom navigation visibility based on which screen is active.
*/
function showScreen(screenId) {
  // Hide all screens
  const allScreens = document.querySelectorAll('.screen');
  allScreens.forEach(screen => {
    screen.classList.add('hidden');
  });

  // Show the requested screen
  document.getElementById(screenId)?.classList.remove('hidden');

  // Manage bottom nav visibility
  const bottomNav = document.getElementById('bottomNav');
  // If the screen is one of these, show bottom nav
  if (['dashboard-screen', 'settings-screen'].includes(screenId)) {
    bottomNav.classList.remove('hidden');
  } else {
    bottomNav.classList.add('hidden');
  }

  // Push to navigation stack if not already on top
  if (!screenStack.length || screenStack[screenStack.length - 1] !== screenId) {
    screenStack.push(screenId);
  }
}

/* ------------------ Back Button ------------------ */
function goBack() {
  if (screenStack.length > 1) {
    // Pop the current screen
    screenStack.pop();
    // Show the previous screen
    const prevScreen = screenStack[screenStack.length - 1];
    showScreen(prevScreen);
  } else {
    // If there's no previous screen, do nothing or show default
    console.log('No previous screen found.');
  }
}

/* ------------------ Onboarding Slider ------------------ */
function goToSlide(index) {
  currentSlide = index;
  const slider = document.getElementById('sliderContainer');
  if (slider) {
    slider.style.transform = `translateX(-${index * 100}vw)`;
  }
  // Update dots
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function startApp() {
  showScreen('login-screen');
}

/* ------------------ LOGIN SCREEN ACTIONS ------------------ */
function loginUser() {
  const email = document.getElementById('loginEmail')?.value.trim();
  const password = document.getElementById('loginPassword')?.value.trim();

  if (!email || !password) {
    alert('Please enter both email and password to log in.');
    return;
  }
  // Placeholder: In a real app, check if user is registered
  // If success:
  showScreen('input-screen');
}

function loginWithGoogle() {
  alert('Redirecting to Google sign-in (placeholder)');
}

function loginWithFacebook() {
  alert('Redirecting to Facebook sign-in (placeholder)');
}

function forgotPassword() {
  alert('Password recovery process (placeholder)');
}

function goToSignUp() {
  alert('Redirect to Sign-up screen (placeholder)');
}

function skipLogin() {
  showScreen('input-screen');
}

/* ------------------ INPUT SCREEN ACTIONS ------------------ */
function toggleMedicationInput() {
  const meds = document.getElementById('medications')?.value;
  const medsInput = document.getElementById('medicationDetails');
  if (meds === 'yes') {
    medsInput?.classList.remove('hidden');
  } else {
    medsInput?.classList.add('hidden');
    if (medsInput) medsInput.value = '';
  }
}

function generateMealPlan() {
  // Validate required fields
  const age = document.getElementById('age')?.value.trim();
  const gender = document.getElementById('gender')?.value.trim();
  const height = document.getElementById('height')?.value.trim();
  const weight = document.getElementById('weight')?.value.trim();
  const goalWeight = document.getElementById('goalWeight')?.value.trim();
  const goalFat = document.getElementById('goalFat')?.value.trim();

  if (!age || !gender || !height || !weight || !goalWeight || !goalFat) {
    alert('Please fill all required fields: Age, Gender, Height, Weight, Goal Weight, Goal Fat Percentage.');
    return;
  }

  // Check if age is in valid range
  const ageNum = parseInt(age, 10);
  if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
    alert('Please enter a valid age (1 - 120).');
    return;
  }

  // Check "other" condition
  const otherCondChk = document.getElementById('otherConditionChk');
  const otherCondText = document.getElementById('otherConditionText');
  if (otherCondChk?.checked && !(otherCondText?.value.trim())) {
    alert('Please specify your other medical condition.');
    return;
  }

  // Budget
  const budget = document.getElementById('budget')?.value.trim();
  if (!budget) {
    alert('Please select a budget preference.');
    return;
  }

  // Alternatives
  const alternatives = document.getElementById('alternatives')?.value.trim();
  if (!alternatives) {
    alert('Please select a choice for alternative food combinations.');
    return;
  }

  // Season
  const seasonChoice = document.getElementById('seasonChoice')?.value.trim();
  if (!seasonChoice) {
    alert('Please select which season’s meal plan you want.');
    return;
  }

  // If all validations pass, proceed to dashboard
  showScreen('dashboard-screen');
}

/* Listen for "Other" condition toggle in checkboxes */
document.getElementById('otherConditionChk')?.addEventListener('change', function() {
  const otherText = document.getElementById('otherConditionText');
  if (this.checked) {
    otherText?.classList.remove('hidden');
  } else {
    otherText?.classList.add('hidden');
    if (otherText) otherText.value = '';
  }
});

/* ------------------ DASHBOARD (TABS) ------------------ */
function showTab(tabName) {
  // Remove 'active' from all tabs
  document.getElementById('tabRecommended')?.classList.remove('active');
  document.getElementById('tabAlternative')?.classList.remove('active');
  document.getElementById('tabRecipes')?.classList.remove('active');

  // Hide all tab contents
  document.getElementById('recommendedFoods')?.classList.remove('active');
  document.getElementById('alternativeFoods')?.classList.remove('active');
  document.getElementById('recipeTab')?.classList.remove('active');

  if (tabName === 'recommended') {
    document.getElementById('tabRecommended')?.classList.add('active');
    document.getElementById('recommendedFoods')?.classList.add('active');
  } else if (tabName === 'alternative') {
    document.getElementById('tabAlternative')?.classList.add('active');
    document.getElementById('alternativeFoods')?.classList.add('active');
  } else if (tabName === 'recipes') {
    document.getElementById('tabRecipes')?.classList.add('active');
    document.getElementById('recipeTab')?.classList.add('active');
  }
}

/* ------------------ BOTTOM NAVIGATION ------------------ */
function navigateTo(screen) {
  if (screen === 'dashboard') {
    showScreen('dashboard-screen');
    // Update active states
    document.getElementById('navHome')?.classList.add('active');
    document.getElementById('navSettings')?.classList.remove('active');
  } else if (screen === 'settings') {
    showScreen('settings-screen');
    document.getElementById('navHome')?.classList.remove('active');
    document.getElementById('navSettings')?.classList.add('active');
  }
}

/* ------------------ RECIPE SCREEN ACTIONS ------------------ */
function goToRecipe(recipeId) {
  // Example data for meal plans or recipes
  const recipes = {
    'Plan1': {
      title: 'Plain Rice + Chicken Curry + Palong Shak + Masoor Dal',
      image: 'simple-curry-leaves-and-coconut-milk-chicken-curry10.jpg',
      desc: 'A balanced meal with simple chicken curry, leafy greens, and a dose of lentils.',
      ingredients: [
        '1 cup Plain Rice',
        'Chicken Curry (pieces of chicken, onion, garlic, spices)',
        'Palong Shak (Spinach), lightly cooked',
        'Masoor Dal, boiled with turmeric and salt'
      ],
      steps: [
        'Cook plain rice in a pot or rice cooker.',
        'Prepare chicken curry with spices and onions.',
        'Lightly stir-fry spinach (palong shak).',
        'Boil masoor dal separately. Serve all together.'
      ]
    },
    'Plan2': {
      title: 'Bhuna Khichuri + Begun Bhaja + Papad',
      image: 'images.jpg',
      desc: 'A comforting meal of spiced rice-lentil khichuri paired with fried eggplant and papad.',
      ingredients: [
        '1 cup Rice + Lentils (Moog or Masoor)',
        'Spices (cumin, coriander, turmeric)',
        'Begun (Eggplant), sliced and fried',
        'Papad'
      ],
      steps: [
        'Wash and soak rice & lentils.',
        'Bhuna them with onions and spices, then add water to cook.',
        'Fry sliced eggplants until golden brown.',
        'Serve with crispy papad on the side.'
      ]
    },
    'Plan3': {
      title: 'Polao + Daab Chingri + Alu Bhorta',
      image: 'daabchingri.png',
      desc: 'A mildly sweet polao complemented by coconut-infused prawns and mashed potatoes.',
      ingredients: [
        'Polao Rice',
        'Daab Chingri (Prawns cooked in coconut or coconut shell)',
        'Alu Bhorta (Mashed potato with onion, chili, mustard oil)'
      ],
      steps: [
        'Cook polao with ghee, spices, and optional nuts.',
        'Steam or bake prawns in coconut milk with spices.',
        'Boil potatoes, mash with chopped onions, chili, salt, mustard oil.'
      ]
    },
    'Plan5': {
      title: 'Panta Bhat + Rui Macher Jhol + Alu Vaji',
      image: 'Paanta bhaat.png',
      desc: 'A traditional fermented rice dish paired with a light rohu fish curry and stir-fried potatoes.',
      ingredients: [
        'Panta Bhat (fermented overnight rice)',
        'Rui Macher Jhol (light fish curry)',
        'Alu Vaji (potato stir-fry)'
      ],
      steps: [
        'Soak cooked rice in water overnight to ferment.',
        'Cook rohu fish in a light curry with onions and spices.',
        'Stir-fry potatoes with onions and green chilies.'
      ]
    },

    // Alternative
    'Brown Rice & Chicken': {
      title: 'Brown Rice & Chicken',
      image: 'brownricechicken.png',
      desc: 'A healthier variant with brown rice and lean chicken.',
      ingredients: [
        '1 cup Brown Rice',
        'Chicken Breast, marinated',
        'Salt, pepper, favorite spices'
      ],
      steps: [
        'Cook brown rice in pot or rice cooker.',
        'Season chicken, bake or grill until cooked.',
        'Serve together.'
      ]
    },

    // Additional example
    'Mixed Vegetable Curry': {
      title: 'Mixed Vegetable Curry',
      image: 'mixedveggie.png',
      desc: 'A quick and healthy curry packed with fresh vegetables.',
      ingredients: [
        'Assorted Vegetables (carrots, beans, cauliflower, etc.)',
        'Onions, ginger, garlic, spices',
        'Oil, salt'
      ],
      steps: [
        'Heat oil in a pan.',
        'Add onions, ginger, garlic, and spices.',
        'Stir-fry vegetables until tender.',
        'Add water or stock, simmer until cooked.'
      ]
    }
  };

  const recipe = recipes[recipeId];
  if (!recipe) {
    alert('Recipe not found.');
    return;
  }

  // Update Recipe Screen
  document.getElementById('recipeTitle').textContent = recipe.title || recipeId;
  document.getElementById('recipeDesc').textContent = recipe.desc || '';
  document.getElementById('recipeImage').src = recipe.image || 'https://via.placeholder.com/350x200';

  const ingList = document.getElementById('ingredientsList');
  ingList.innerHTML = '';
  if (recipe.ingredients && recipe.ingredients.length) {
    recipe.ingredients.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      ingList.appendChild(li);
    });
  }

  const stepsList = document.getElementById('stepsList');
  stepsList.innerHTML = '';
  if (recipe.steps && recipe.steps.length) {
    recipe.steps.forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      stepsList.appendChild(li);
    });
  }

  // Now navigate to the recipe screen
  // (Note that we removed the video section as per your code)
  showScreen('recipe-screen');
}

function addToFavorites() {
  alert('Added to favorites (placeholder)');
}

function shareRecipe() {
  alert('Share recipe logic (placeholder)');
}

function addIngredientsToShoppingList() {
  alert('Ingredients added to shopping list (placeholder)');
}

/* ------------------ On Load ------------------ */
window.onload = () => {
  // Start on the onboarding screen by default
  showScreen('onboarding-screen');
};
