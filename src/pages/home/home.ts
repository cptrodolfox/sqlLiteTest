import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { AddNewsPage } from '../add-news/add-news';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  news: any = [];
  totalNews = 0;

  constructor(public navCtrl: NavController, 
    private sqlite: SQLite) {}

  getNews() {
    this.sqlite.create({
      name: 'newsdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS new(rowid INTEGER PRIMARY KEY, title TEXT, date TEXT, description TEXT)', {})
      .then( res => console.log('Executed SQL') ) 
      .catch( e => console.log(e));
      db.executeSql('SELECT * FROM new ORDER BY rowid DESC', {})
      .then( res => {
        this.news = [];
        for(var i=0; i<res.rows.length; i++){
          this.news.push({
            rowid:res.rows.item(i).rowid,
            title:res.rows.item(i).title,
            date:res.rows.item(i).date,
            description:res.rows.item(i).date
          });
          this.totalNews ++;
        }
      })
      .catch( e => console.log(e));
    });
  }
  ionViewDidLoad() {
    this.getNews();
  }
  ionViewWillEnter() {
    this.getNews();
  }

  addNews() {
    this.navCtrl.push(AddNewsPage);
  }

  deleteNews( rowid ) {
    this.sqlite.create({
      name: 'newsdb.db',
      location: 'default'
    }).then(( db: SQLiteObject) => {
      db.executeSql('DELETE FROM new WHERE rowid=?', [rowid])
      .then( res => {
        console.log(res);
        this.getNews();
      })
      .catch( e => console.log(e));
    }).catch( e => console.log(e));
  }

}
