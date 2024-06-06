document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById('loading');
    const pages = document.querySelectorAll('.main-screen');
    const navItems = document.querySelectorAll('.nav-item');
    const coinAmountSpan = document.querySelector('.coin-amount');
    const characterHer = document.getElementById('character-her');
    const characterHim = document.getElementById('character');
    const upgradeButtons = document.querySelectorAll('.upgrade-button');
    const genderSwitchInputs = document.querySelectorAll('.gender-switch input');
    const contentHer = document.getElementById('content-her');
    const contentHim = document.getElementById('content-him');

    // Load balance from localStorage
    let coins = parseInt(localStorage.getItem('coins')) || 0;
    coinAmountSpan.textContent = coins;

    let autoClickers = {
        gym: { level: 0, basePrice: 50, increment: 1, currentRate: 0 },
        aiTap: { level: 0, basePrice: 50000, increment: 5, currentRate: 0 },
        airdrop: { level: 0, basePrice: 500000, increment: 15, currentRate: 0 },
        defi: { level: 0, basePrice: 1000000, increment: 30, currentRate: 0 },
    };

    const updateCoinAmount = () => {
        coinAmountSpan.textContent = coins;
        localStorage.setItem('coins', coins);
    };

    const autoIncrementCoins = () => {
        let incrementAmount = 0;
        for (let key in autoClickers) {
            incrementAmount += autoClickers[key].currentRate;
        }
        coins += incrementAmount;
        updateCoinAmount();
    };

    setInterval(autoIncrementCoins, 1000);

    const buyUpgrade = (upgradeKey) => {
        const upgrade = autoClickers[upgradeKey];
        const price = upgrade.basePrice * Math.pow(1.2, upgrade.level);
        if (coins >= price) {
            coins -= price;
            upgrade.level++;
            upgrade.currentRate += upgrade.increment;
            updateCoinAmount();
        }
    };

    upgradeButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const upgradeKeys = Object.keys(autoClickers);
            buyUpgrade(upgradeKeys[index]);
        });
    });

    const switchPage = (pageId) => {
        pages.forEach(page => page.style.display = 'none');
        document.getElementById(pageId).style.display = 'flex';
    };

    navItems.forEach(navItem => {
        navItem.addEventListener('click', () => {
            const pageId = navItem.dataset.page;
            switchPage(pageId);
        });
    });

    // Set initial page
    switchPage('home-page');

    genderSwitchInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (input.value === 'her') {
                contentHer.style.display = 'flex';
                contentHim.style.display = 'none';
            } else {
                contentHer.style.display = 'none';
                contentHim.style.display = 'flex';
            }
        });
    });

    // Show loading screen for 4 seconds
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        switchPage('home-page');
    }, 4000);

    // Add click event to the characters
    characterHer.addEventListener('click', () => {
        coins++;
        updateCoinAmount();
    });

    characterHim.addEventListener('click', () => {
        coins++;
        updateCoinAmount();
    });
});
