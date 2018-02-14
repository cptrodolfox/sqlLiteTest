import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
/**
 * Generated class for the AddNewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-news',
  templateUrl: 'add-news.html',
})
export class AddNewsPage {

  data = { title:"", date:"", description:"" };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private sqlite:SQLite, 
    private toast: Toast) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewsPage');
  }

  saveNews() {
    this.sqlite.create({
      name: 'newsdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO new VALUES(NULL,?,?,?)',
    [this.data.title, this.data.date, this.data.description])
    .then(res => {
      console.log(res);
      this.toast.show('News saved', '5000', 'center').subscribe(
        toast => {
          this.navCtrl.popToRoot();
        }
      );
    })
    .catch( e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe( toast => {
        console.log(toast);
      }
    );
    });
    }).catch( e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

}
