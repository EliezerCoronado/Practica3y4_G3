import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mycards',
  templateUrl: './mycards.component.html',
  styleUrls: ['./mycards.component.css']
})
export class MycardsComponent implements OnInit {

  constructor() { }

  cards:any=[
    {
    'value': 10,
    'id': "1",
    'image': "https://media.karousell.com/media/photos/products/2020/5/21/rm50_goggle_play_gift_card_mal_1590040469_c1100b5a_progressive.jpg",
    'name': "Google Play"
  },
  {
    'value': 10,
    'id': "1",
    'image': "https://media.karousell.com/media/photos/products/2020/5/21/rm50_goggle_play_gift_card_mal_1590040469_c1100b5a_progressive.jpg",
    'name': "Google Play"
  },
  {
    'value': 10,
    'id': "1",
    'image': "https://media.karousell.com/media/photos/products/2020/5/21/rm50_goggle_play_gift_card_mal_1590040469_c1100b5a_progressive.jpg",
    'name': "Google Play"
  },

  {
    'value': 100,
    'id': "2",
    'image': "https://www.allkeyshop.com/blog/wp-content/uploads/PlayStationNetworkGiftCard.jpg",
    'name': "PlayStation"
  },

  {
    'value': 100,
    'id': "2",
    'image': "https://www.allkeyshop.com/blog/wp-content/uploads/PlayStationNetworkGiftCard.jpg",
    'name': "PlayStation"
  },

  {
    'value': 100,
    'id': "2",
    'image': "https://mojolika.com/wp-content/uploads/2019/04/196.png",
    'name': "Steam"
  },

  {
    'value': 100,
    'id': "2",
    'image': "https://www.shopmyexchange.com/products/images/xlarge/2008097_0000.jpg",
    'name': "Amazon"
  },

  {
    'value': 100,
    'id': "2",
    'image':  "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1XIn1?ver=1a7a",
    'name': "Microsoft"
  }



 
 



];

  ngOnInit(): void {
  }

}
