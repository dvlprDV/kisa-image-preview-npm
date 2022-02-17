/* Copyright © 2022 Mobintel Pty Ltd - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Initial author: Vladimir Pikharev
*/
/* You can add global styles to this file, and also import other style files */
let imgArray = [];
let currIndex = 0;
let pos = { top: 0, left: 0, x: 0, y: 0 };
let ele;
export function nextImg() {
  if (imgArray.length > (currIndex + 1)) {
    currIndex++;
    document.getElementById('slider-name').innerHTML = imgArray[currIndex].name;
    document.getElementsByClassName('slider-image-img-preview')[0].style.backgroundImage = `url(${imgArray[currIndex].previewUrl})`;
  }
}

export function prevImg() {
  if (currIndex !== 0) {
    currIndex--;
    document.getElementById('slider-name').innerHTML = imgArray[currIndex].name;
    document.getElementsByClassName('slider-image-img-preview')[0].style.backgroundImage = `url(${imgArray[currIndex].previewUrl})`;
  }
}

export function init(arrayImg, index) {
  imgArray = arrayImg;
  currIndex = index || 0;
  const body = document.getElementsByTagName('body')[0];
  console.dir(body);
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('main-container-img-preview');
  body.insertBefore(imageContainer, body.children[0]);
  insertHTML(imageContainer);
  document.getElementsByClassName('slider-image-img-preview')[0].style.backgroundImage = `url(${imgArray[currIndex].previewUrl})`;
  document.getElementsByClassName('slider-image-img-preview')[0].style.backgroundRepeat = `no-repeat`;
  document.getElementById('close-img-preview').addEventListener('click', closeImgPreview);
  document.getElementById('navigation-button-prev-img-preview').addEventListener('click', prevImg);
  document.getElementById('navigation-button-next-img-preview').addEventListener('click', nextImg);
  document.getElementById('download-img-preview').addEventListener('click', forceDownload);
  document.getElementById('footer-zoom-btn').addEventListener('click', zoomIn);
  document.getElementById('footer-zoom-btn-zoom-out').addEventListener('click', zoomOut);
  ele = document.getElementById('image-cont-img-preview');
  ele.addEventListener('mousedown', mouseDownHandler);
  ele.scrollTop = 100;
  ele.scrollLeft = 150;

}

const mouseDownHandler = function (e) {
  ele.style.cursor = 'grabbing';
  ele.style.userSelect = 'none';
  pos = {
    left: ele.scrollLeft,
    top: ele.scrollTop,
    x: e.clientX,
    y: e.clientY,
  };

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function (e) {
  const dx = e.clientX - pos.x;
  const dy = e.clientY - pos.y;
  ele.scrollTop = pos.top - dy;
  ele.scrollLeft = pos.left - dx;
};

const mouseUpHandler = function () {
  document.removeEventListener('mousemove', mouseMoveHandler);
  document.removeEventListener('mouseup', mouseUpHandler);
  ele.style.cursor = 'grab';
  ele.style.removeProperty('user-select');
};

export function closeImgPreview () {
  const el = document.getElementsByClassName('main-container-img-preview')[0];
  el.remove();
}

function forceDownload(url = imgArray[currIndex].previewUrl, fileName = imgArray[currIndex].name){
  const xhr = new XMLHttpRequest();
  xhr.open("GET", imgArray[currIndex].previewUrl, true);
  xhr.responseType = "blob";
  xhr.onload = function(){
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(this.response);
    const tag = document.createElement('a');
    tag.href = imageUrl;
    tag.download = fileName;
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
  };
  xhr.send();
}

function zoomIn() {
  const counter = document.getElementById('footer-percent-img-preview');
  const img = document.getElementById('slider-image-img-preview');
  switch (img.style.width) {
    case '': {
      counter.innerText = '125%';
      img.style.width = '125%';
      img.style.height = '125%';
      img.style.maxWidth = 'unset';
      img.style.maxHeight = 'unset';
    }
      break;
    case '125%':
    {
      img.style.width = '150%';
      img.style.height = '150%';
      counter.innerText = '150%';
    }
      break;
    case '150%': {
      img.style.width = '175%';
      img.style.height = '175%';
      counter.innerText = '175%';
    }
      break;
    case '175%': {
      img.style.width = '200%';
      img.style.height = '200%';
      counter.innerText = '200%';
    }
      break;
    default: return;
  }
}

function zoomOut() {
  const counter = document.getElementById('footer-percent-img-preview');
  const img = document.getElementById('slider-image-img-preview');
  switch (img.style.width) {
    case '125%': {
      counter.innerText = '100%';
      img.style.width = '';
      img.style.height = '';
      img.style.maxWidth = '';
      img.style.maxHeight = '';
    }
      break;
    case '150%':
    {
      img.style.width = '125%';
      img.style.height = '125%';
      counter.innerText = '125%';
    }
      break;
    case '175%': {
      img.style.width = '150%';
      img.style.height = '150%';
      counter.innerText = '150%';
    }
      break;
    case '200%': {
      img.style.width = '175%';
      img.style.height = '175%';
      counter.innerText = '175%';
    }
      break;
    default: return;
  }
}

function insertHTML (el) {
  el.innerHTML = `
  <div class="header-img-preview d-flex">
    <div class="name-img-preview" id="slider-name">${imgArray[currIndex].name}</div>
    <div class="actions-img-preview">
      <div class="download-img-preview" id="download-img-preview">
        <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 6H10V0H4V6H0L7 13L14 6ZM6 8V2H8V8H9.17L7 10.17L4.83 8H6ZM0 15H14V17H0V15Z" fill="white"/>
        </svg>
        Download
      </div>
      <div class="close-img-preview d-flex" id="close-img-preview">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="white"/>
        </svg>
      </div>
    </div>
  </div>
  <div class="image-container-img-preview">
    <div class="left-navigation-img-preview d-flex">
      <div class="navigation-button-img-preview d-flex" id="navigation-button-prev-img-preview">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 5.4303L15.544 4L7.4 12L15.544 20L17 18.5697L10.3121 12L17 5.4303V5.4303Z" fill="white"/>
        </svg>
      </div>
    </div>
    <div class="image-cont-img-preview"
      id="image-cont-img-preview"
    >
      <div class="slider-image-img-preview"
       id="slider-image-img-preview"></div>
    </div>
    <div class="right-navigation-img-preview d-flex">
      <div class="navigation-button-img-preview d-flex" id="navigation-button-next-img-preview">
          <svg width="24" height="24" viewB ox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 18.5697L8.45604 20L16.6 12L8.45604 4L7 5.4303L13.6879 12L7 18.5697V18.5697Z" fill="white"/>
        </svg>
      </div>
    </div>
  </div>
  <div class="footer-img-preview d-flex">
    <div class="footer-zoom-btn" id="footer-zoom-btn-zoom-out">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 11H12.21L11.93 10.73C12.91 9.59 13.5 8.11 13.5 6.5C13.5 2.91 10.59 0 7 0C3.41 0 0.5 2.91 0.5 6.5C0.5 10.09 3.41 13 7 13C8.61 13 10.09 12.41 11.23 11.43L11.5 11.71V12.5L16.5 17.49L17.99 16L13 11ZM7 11C4.51 11 2.5 8.99 2.5 6.5C2.5 4.01 4.51 2 7 2C9.49 2 11.5 4.01 11.5 6.5C11.5 8.99 9.49 11 7 11ZM4.5 6H9.5V7H4.5V6Z" fill="white"/>
      </svg>
      <span>Zoom out</span>
    </div>
    <div class="footer-percent" id="footer-percent-img-preview">
      100%
    </div>
    <div class="footer-zoom-btn"
      id="footer-zoom-btn">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 11H12.21L11.93 10.73C12.91 9.59 13.5 8.11 13.5 6.5C13.5 2.91 10.59 0 7 0C3.41 0 0.5 2.91 0.5 6.5C0.5 10.09 3.41 13 7 13C8.61 13 10.09 12.41 11.23 11.43L11.5 11.71V12.5L16.5 17.49L17.99 16L13 11ZM7 11C4.51 11 2.5 8.99 2.5 6.5C2.5 4.01 4.51 2 7 2C9.49 2 11.5 4.01 11.5 6.5C11.5 8.99 9.49 11 7 11ZM7.5 4H6.5V6H4.5V7H6.5V9H7.5V7H9.5V6H7.5V4Z" fill="white"/>
      </svg>
      <span>Zoom in</span>
    </div>
  </div>
  `
}
