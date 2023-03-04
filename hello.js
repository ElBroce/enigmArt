export function hello () {
    const picDiv = document.getElementById('upload');
    const input = document.querySelector('input');
    input.addEventListener('change', updateImageDisplay);

    input.click(); 

    function updateImageDisplay() {
    root.style.setProperty('--bg', "url(" + URL.createObjectURL(input.files[0]) + ")");
    }
}
