let isDown = false;
let startX;
let scrollLeft;
let isRightClicking = false;

const scrollWrapper = document.querySelector('.horizontal-scroll-wrapper');
const scrollSpeed = 1; // Переменная для скорости прокрутки

if (scrollWrapper) {
  scrollWrapper.addEventListener('mousedown', (e) => {
    if (e.button === 2) {
      isRightClicking = true;
      return;
    }
    
    isDown = true;
    startX = e.pageX - scrollWrapper.offsetLeft;
    scrollLeft = scrollWrapper.scrollLeft;
    e.preventDefault(); // Отменяем выделение текста
  });

  scrollWrapper.addEventListener('mouseleave', () => {
    isDown = false;
    isRightClicking = false;
  });

  scrollWrapper.addEventListener('mouseup', () => {
    isDown = false;
    isRightClicking = false;
  });

  scrollWrapper.addEventListener('mousemove', (e) => {
    if (!isDown && !isRightClicking) return;

    e.preventDefault();

    const x = e.pageX - scrollWrapper.offsetLeft;
    const walk = (x - startX) * scrollSpeed;
    scrollWrapper.scrollLeft = scrollLeft - walk;

    // Добавим эффект эластичности только для тяги от границы
    if (isRightClicking) {
      checkBoundsForRightClick();
    }
  });

  // Добавляем проверку границы прокрутки
  const checkBounds = () => {
    if (scrollWrapper.scrollLeft < 0) {
      scrollWrapper.scrollLeft = 0;
    } else if (scrollWrapper.scrollLeft > scrollWrapper.scrollWidth - scrollWrapper.clientWidth) {
      scrollWrapper.scrollLeft = scrollWrapper.scrollWidth - scrollWrapper.clientWidth;
    }
  };

  // Функция для добавления эффекта эластичности при тяге от границы для правой кнопки мыши
  const checkBoundsForRightClick = () => {
    const maxElasticity = 100; // Максимальный уровень эластичности
    const elasticityFactor = 0.05; // Фактор эластичности

    if (scrollWrapper.scrollLeft < -maxElasticity) {
      scrollWrapper.scrollLeft = -maxElasticity;
    } else if (scrollWrapper.scrollLeft > scrollWrapper.scrollWidth - scrollWrapper.clientWidth + maxElasticity) {
      scrollWrapper.scrollLeft = scrollWrapper.scrollWidth - scrollWrapper.clientWidth + maxElasticity;
    }

    if (isRightClicking) {
      const elasticOffset = (scrollLeft - scrollWrapper.scrollLeft) * elasticityFactor;
      scrollWrapper.scrollLeft += elasticOffset;
    }
  };

  scrollWrapper.addEventListener('scroll', checkBounds);

  // Обработка нажатий на стрелочки
  const scrollRightButton = document.querySelector('.scroll-right');
  const scrollLeftButton = document.querySelector('.scroll-left');

  if (scrollRightButton && scrollLeftButton) {
    scrollRightButton.addEventListener('click', () => {
      scrollBySmooth(scrollWrapper, scrollWrapper.clientWidth);
    });

    scrollLeftButton.addEventListener('click', () => {
      scrollBySmooth(scrollWrapper, -scrollWrapper.clientWidth);
    });
  }
}

// Функция для плавной прокрутки с эффектом эластичности
function scrollBySmooth(element, distance) {
  const start = element.scrollLeft;
  const startTime = performance.now();

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  function animateScroll() {
    const currentTime = performance.now();
    const elapsed = currentTime - startTime;

    element.scrollLeft = easeInOutQuad(elapsed, start, distance, 500);

    if (elapsed < 500) {
      requestAnimationFrame(animateScroll);
    }
  }

  animateScroll();
}
