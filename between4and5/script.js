// Находим tooltip и текст внутри него
const tooltip = document.getElementById("tooltip");
const imgTooltip = document.getElementById("imgTooltip");
// Получаем все точки
const points = document.querySelectorAll(".chart-point");

// Добавляем обработчики событий на каждую точку
points.forEach(point => {
    point.addEventListener('mouseover', (event) => {
         // Получаем значение скорости из атрибута data-tooltip
        const speed = event.target.getAttribute('data-tooltip');
        // tooltipText.textContent = `Speed: ${speed}`;
        if (speed === "20%") {
            imgTooltip.src = "images/timers/timer20.svg";
        }
        if (speed === "40%") {
            imgTooltip.src = "images/timers/timer40.svg";
        }
        if (speed === "60%") {
            imgTooltip.src = "images/timers/timer60.svg";
        }
        if (speed === "80%") {
            imgTooltip.src = "images/timers/timer80.svg";
        }
        
        const svg = event.target.closest("svg");
        const pointRect = event.target.getBoundingClientRect();
        const svgRect = svg.getBoundingClientRect();
        
        // Рассчитываем позицию tooltip относительно SVG-контейнера
        const tooltipX = pointRect.x - svgRect.x + pointRect.width / 2;
        const tooltipY = pointRect.y - svgRect.y - tooltip.offsetHeight;
        const screenWidth = window.innerWidth;
        console.log(screenWidth);
        if (screenWidth < 400){
            tooltip.style.left = `${tooltipX}px`;
            tooltip.style.top = `${tooltipY+350}px`;
            tooltip.style.display = 'block';
        }
        else if (screenWidth < 900) {
            tooltip.style.left = `${tooltipX}px`;
            tooltip.style.top = `${tooltipY+230}px`;
            tooltip.style.display = 'block';
        }
        else {
            tooltip.style.left = `${tooltipX}px`;
            tooltip.style.top = `${tooltipY+180}px`;
            tooltip.style.display = 'block';
        }
        // Устанавливаем позицию tooltip и отображаем его
        
    });

    point.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });
});
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;

function updateSlider() {
  const slides = document.querySelectorAll('.slide');
  slides.forEach((slide, index) => {
    slide.style.display = index === currentSlide ? 'flex' : 'none';
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + dots.length) % dots.length;
  updateSlider();
});

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % dots.length;
  updateSlider();
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    updateSlider();
  });
});

// Initialize slider
updateSlider();
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;

    // Раскрытие текущего элемента
    header.classList.toggle('active');
    if (header.classList.contains('active')) {
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.padding = '15px 20px';
    } else {
      content.style.maxHeight = '0';
      content.style.padding = '0 20px';
    }

    // Закрытие остальных элементов
    accordionHeaders.forEach(otherHeader => {
      if (otherHeader !== header && otherHeader.classList.contains('active')) {
        otherHeader.classList.remove('active');
        const otherContent = otherHeader.nextElementSibling;
        otherContent.style.maxHeight = '0';
        otherContent.style.padding = '0 20px';
      }
    });
  });
});
