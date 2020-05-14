import * as React from 'react';
import { AsyncStorage} from 'react-native';
class MyGlobalSetting {
   constructor(props){
    this.url_api = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/';
    this.auth = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQwNWRlMGJmODJlZWQwMGFkMTJjNTY3MzJhNWU1YThmMjYyNWNmZTJhN2NlMDljZTVkOGNiYWYwMWE1MTFlNWUzZGRiNjFhNWVhZGMzMzkzIn0.eyJhdWQiOiIxIiwianRpIjoiZDA1ZGUwYmY4MmVlZDAwYWQxMmM1NjczMmE1ZTVhOGYyNjI1Y2ZlMmE3Y2UwOWNlNWQ4Y2JhZjAxYTUxMWU1ZTNkZGI2MWE1ZWFkYzMzOTMiLCJpYXQiOjE1NjI4MjYwNDcsIm5iZiI6MTU2MjgyNjA0NywiZXhwIjoxNTk0NDQ4NDQ3LCJzdWIiOiI0NSIsInNjb3BlcyI6W119.BOMTDbLX8_5de6fn396MCWqc6MID7d8M30I0z5Ow3LZFXpfMrjnMMr22KyRWSKcprmqJ5QyuZbMgNdwjaSwArbs9W76QG0y3CVjAGuZGj7mb2Wdw6Pf5_vRMAlgvR48jIN7QZyoTPaBBmJ8n8nklYKKuP1Co--bLjdeYuTJOGzeef_i1d61yaRUDrG06i_-LFLr41cKYGJfw44Ubm75lUI2XHT5wqY1cje6orHBqgmps0EgH-8yYGlnMEFDVQGuMHhnZl3fOawZ466QE0qZ08AZmc4G60U87Jqy-VAKu_Prjges2YfsXVfBBt-Zs60JS2NG6bnz5F1l5Q5lz89K0nN304u87tUv7_CjAp9nrpka6WaNh4XrrUMUozT_ze-6EU2WWJlEswHbjcJZK12RmmG8N_yrJXZ08q5Bpy5xpH5QA9VmDCrBcqmbggOgzbtmBbPrLIvTmF1mpi__HKGdcCi-tSg1h0VdOWznWliEH6pg7IklwX5xHhw-nIVCP8zuYpOO-vWskF7X_lNNUeGHDu7BwtyyUD7R1sJ56LzA6rQDyQCMt3xErgJRal6Dqj7EegK0RLsSwJc31K2Gc6Bf1tReZ4gxuu_gyNRkbo7WAuOjPzufjnL34xqqtU0XdBTqxWiH6GtlYHZopNHcfmgFuYye1ZI4ZIasDtXGA8Y49U0k';
    AsyncStorage.getItem('user', (error, result) => {
        if (result) {
            let resultParsed = JSON.parse(result);
            this.id_user=resultParsed.id_user;
            this.email=resultParsed.email;
            this.name=resultParsed.full_name;
        this.isAuthenticated =true;
        }else{
        this.isAuthenticated =false;
        }
    });
    AsyncStorage.getItem('mainColor', (error, result) => {
      if (result) {
      this.mainColor =result;
      }else{
        this.mainColor ='#23c0d9';
      }
  });
  }
  
getStar = count => {
  const items = [];
  let i = 0;
  while (i < count) {
    i++;
    items.push(
      <View  key={i}>
      <Icon name='star' type='font-awesome' color='#dea21b' size={13} />
      </View>
    );
  }

  return items;
};
}


export default (new MyGlobalSetting);