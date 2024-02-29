document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;
  
    function showItem(index) {
      items.forEach(item => item.classList.remove('active'));
      items[index].classList.add('active');
    }
  
    function goToPrevItem() {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      showItem(currentIndex);
    }
  
    function goToNextItem() {
      currentIndex = (currentIndex + 1) % items.length;
      showItem(currentIndex);
    }
  
    document.getElementById('prevButton').addEventListener('click', goToPrevItem);
    document.getElementById('nextButton').addEventListener('click', goToNextItem);
  });