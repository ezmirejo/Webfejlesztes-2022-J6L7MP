import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Carpet } from '../models/carpet';

@Injectable({
  providedIn: 'root'
})
export class CarpetService {

  collectionName = 'Carpets';
  carpets : Observable<Array<Carpet>>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage    
    ) {
      this.carpets = this.afs.collection<Carpet>(this.collectionName).valueChanges()
    }

  loadCarpetData():  Observable<Array<Carpet>> {
    return this.carpets;
  }

  loadImage(imageUrl: string) {
    return this.storage.ref(imageUrl).getDownloadURL();

  }
  getCarpet(){
    return this.afs.collection<Carpet>(this.collectionName).get();
  }
}
