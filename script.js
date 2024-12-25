const photoContainer = document.getElementById('photoContainer');
document.querySelectorAll('.toggle-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const floor = button.innerText.split(' ')[1];
        photoContainer.innerHTML = `<h2>Выбран ${floor} этаж</h2>`;
        photoContainer.classList.remove('slide-in');
        void photoContainer.offsetWidth;
        photoContainer.classList.add('slide-in');
    });
});
