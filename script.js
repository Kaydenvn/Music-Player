
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document)

const player = $('.player')
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const prevBtn = $('.btn-prev');
const nextBtn = $('.btn-next');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
    {
      name: "Waiting For You",
      singer: "Mono",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui2026/WaitingForYou-MONOOnionn-7733882.mp3?st=iy65f6rWB5tWtydduGnBzg&e=1666690274&download=true",
      image: "https://avatar-ex-swe.nixcdn.com/song/2022/08/10/4/8/b/1/1660104031203.jpg"
    },
    {
      name: "'bao tiền một mớ bình yên?'",
      singer: "14 Casper & Bon",
      path: "https://seaf20.iiiijjjjij.com/files/2020/12/24/bao_tien_mot_mo_binh_yen_14_casper_bon_official_-6017846461197151005.mp3",
      image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/1/c/3/b/1c3b6283e28b9030d8f6410b210bd765.jpg"    
    },
    {
      name: "Anh Chưa Thương Em Đến Vậy Đâu",
      singer: "Lady Mây",
      path:
        "https://seaf20.iiiijjjjij.com/files/2022/10/4/anh_chua_thuong_em_den_vay_dau_lady_may_the_masked_singer_vietnam_audio_lyrics_-980115196677122443.mp3",
      image: "https://i.ytimg.com/vi/CMOMeBjSRaI/maxresdefault.jpg"
    },
    {
      name: "Ghé Qua",
      singer: "Dick x PC x Tofu",
      path: "https://seaf20.iiiijjjjij.com/files/2021/5/31/ghe_qua_official_mv_dick_x_pc_x_tofu_-324374146616000855.mp3",
      image:
        "https://i.ytimg.com/vi/zEWSSod0zTY/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAAVjJD-1ldHc8tvUmFsTAGbTB5CQ"
    },
    {
      name: "Thanh Xuân",
      singer: "Da LAB",
      path: "https://seaf20.iiiijjjjij.com/files/2022/9/15/thanh_xuan_da_lab_official_mv_-7508981040855453004.mp3",
      image:
        "https://i.ytimg.com/vi/GgQFO8dL5XQ/maxresdefault.jpg"
    },
    {
      name: "Thằng Điên",
      singer: "JUSTATEE x PHƯƠNG LY",
      path:
        "https://seaf20.iiiijjjjij.com/files/2021/6/1/thang_dien_justatee_x_phuong_ly_official_mv_-5252447269763228750.mp3",
      image:
        "https://i.ytimg.com/vi/HXkh7EOqcQ4/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCRIs6eFLuBLQ7wdhSsnQw2C3txvA"
    },
    {
      name: "Nước Mắt Em Lau Bằng Tình Yêu Mới",
      singer: "Da LAB ft. Tóc Tiên",
      path: "https://seaf20.iiiijjjjij.com/files/2022/10/25/nuoc_mat_em_lau_bang_tinh_yeu_moi_-9007628366938262213.mp3",
      image:
        "https://i.ytimg.com/vi/GQ4F9k4USfA/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDXyoIb03mwqKeEd2pRARyIjBEERg"
    },
    {
      name: "Hết Thương Cạn Nhớ",
      singer: "ĐỨC PHÚC",
      path: "https://seaf20.iiiijjjjij.com/files/2020/6/30/het_thuong_can_nho_duc_phuc_official_music_video_SuxyBXMByoK-gucZVizY.mp3",
      image:
        "https://i.ytimg.com/vi/DZDYZ9nRHfU/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDGbKL2ElqizqRTkYxYbXdrV3x_hw"
    },
    {
      name: "Nàng Thơ",
      singer: "Hoàng Dũng",
      path: "https://seaf20.iiiijjjjij.com/files/2021/5/31/nang_tho_hoang_dung_official_mv_8803641520877252052.mp3",
      image:
        "https://i.ytimg.com/vi/Zzn9-ATB9aU/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCh5OrCVTunHAEmVFb5JNHktfdgYQ"
    }
    ],
    
  render: function () {
      const htmls = this.songs.map((song, index) => {
        return `
          <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
          <div class="thumb" 
            style="background-image: url('${song.image}')">
          </div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div></div>`
      })
      $('.playlist').innerHTML = htmls.join('')
    },

  defineProperties: function () {
      Object.defineProperty(this, 'currentSong', {
        get: function (){
          return this.songs[this.currentIndex]
        }
      })
    },

  handleEvents: function() {
      const _this = this;
      const cdwidth = cd.offsetWidth;

      // Xử lý CD quay và dừng
      const cdThumbAnimate = cdThumb.animate([
        {transform: 'rotate(360deg)'}
      ], {
        duration: 10000, // 10 sec
        iterations: Infinity
      })

      cdThumbAnimate.pause()
    
      // Xử lý phóng to thu nhỏ CD
      document.onscroll = function() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const newCdWidth = cdwidth - scrollTop;
        cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
        cd.style.opacity = newCdWidth / cdwidth;
      }

      // Xử lý khi click play
      playBtn.onclick = function () {
        if (_this.isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
      }

      // Khi bài hát được play
      audio.onplay = function () {
        _this.isPlaying = true;
        player.classList.add('playing');
        cdThumbAnimate.play();
      }

       // Khi bài hát bị pause
       audio.onpause = function () {
        _this.isPlaying = false;
        player.classList.remove('playing');
        cdThumbAnimate.pause();
      }

      // Khi tiến độ bài hát thay đổi
      audio.ontimeupdate = function () {
        if (audio.duration) {
          const progressPercent = Math.floor(audio.currentTime / audio.duration *100);
          progress.value = progressPercent;
        }
      }
    
      // Xử lý khi tua bài hát
      progress.onchange = function (e) {
        const seekTime = audio.duration / 100 * e.target.value;
        audio.currentTime = seekTime;
      }

      //Khi next bài hát
      nextBtn.onclick = function (){
        if (_this.isRandom) {
          _this.playRandomSong()
        } else {
          _this.nextSong()
        }
        audio.play();
        _this.render();
        _this.scrollToActiveSong();
      }

      //Khi prev bài hát
      prevBtn.onclick = function (){
        _this.prevSong();
        audio.play();
        _this.render();
        _this.scrollToActiveSong();
      }

      //Khi random bài hát
      randomBtn.onclick = function (e) {
        _this.isRandom = !_this.isRandom;
        randomBtn.classList.toggle('active', _this.isRandom)
        _this.playRandomSong();
      }

      // Xử lý lặp lại bài hát
      repeatBtn.onclick = function () {
        _this.isRepeat = !_this.isRepeat;
        repeatBtn.classList.toggle('active', _this.isRepeat)
      }

      // Xử lý nextSong khi audio end
      audio.onended = function () {
        if (_this.isRepeat) {
          audio.play()
        } else {
          nextBtn.click();
        }
      }

      // Lắng nghe hành vi click vào playlist
      playlist.onclick = function (e){
        const songNode = e.target.closest('.song:not(.active)');
        if(songNode || e.target.closest('.option')) {
          // Xử lý khi click vào bài hát
          if(songNode){
            _this.currentIndex = Number(songNode.dataset.index);
            _this.loadCurrentSong();
            audio.play();
            _this.render();
          }
        }
      }
  },

    scrollToActiveSong: function () {
      setTimeout(() => {
        $('.song.active').scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }, 500);
    },

    loadCurrentSong: function () {
      heading.textContent =  this.currentSong.name;
      cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
      audio.src = this.currentSong.path;
    },

    nextSong: function () {
      this.currentIndex++;
      if(this.currentIndex >= this.songs.length) {
        this.currentIndex = 0
      }
      this.loadCurrentSong();
    },

    prevSong: function () {
      this.currentIndex--;
      if(this.currentIndex < 0 ) {
        this.currentIndex = this.songs.length;
      }
      this.loadCurrentSong()
    },

    playRandomSong: function () {
      let newIndex;
      do{
        newIndex = Math.floor(Math.random() * this.songs.length)
      }
      while (newIndex == this.currentIndex)
      
      this.currentIndex = newIndex;
      this.loadCurrentSong();
    },

    start: function () {
      // Định nghĩa các thuộc tính cho object
      this.defineProperties();

      // Lắng nghe và xử lí các sự kiện
      this.handleEvents();

      // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
      this.loadCurrentSong();

      // Render playlist
      this.render();
    } 

}

app.start()