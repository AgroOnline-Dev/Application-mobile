import React,{useEffect, useState} from 'react';
import { Text, View, StyleSheet,FlatList, ActivityIndicator,TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { FontAwesome } from '@expo/vector-icons';
import * as IntentLauncher from 'expo-intent-launcher';
import axios from 'axios';
import adresseServer from '../Composants/adresseServer';
import colors from '../Constantes/constants';

export default function FicheTech (){
  
  const [fichesTech,setFichesTech]=useState([]); // VARIABLE POUR LA LISTE DES FICHES TECH DE LA BD

//Ce useEffect excute la fonction de récuperation des fiches au moment du montage du composant
useEffect(()=>{

  //LIEN VERS MON SERVEUR EXPRESS COMPRENANT LE ROUTE A INDEXER
  const url=adresseServer+"FichesTechniques";
  
  //RECUPERATION DES FICHES TECH SE TROUVANT DANS LA BD
  axios.get(url).then((res)=>{
    setFichesTech(res.data) //STOCKAGE DU RESULTAT DANS LA VARIABLE FICHESTECH
  }).catch((err)=>{
    console.log(err);
  })
},[])

//FONCTION QUI OUVRE ET PERMET DE TELECHARGER UN FICHIER CHOISIT via L'ID
const OpenFile = async (item) => {
  const id = item.id;  //Récupère l'ID du fichier
  const nom = item.nom; //Recupère le nom du fichier
  //Lien vers mon serveur express qui envoit les params id et nom
  const url = adresseServer+`FichesTechniques/${id}/${nom}`;
    try {
      const response = await axios.get(url, { responseType: 'blob' }); //Recuperation du fichier blob
      const fileReader = new FileReader();
      fileReader.readAsDataURL(response.data); //Lecture Du blob comme URL pour le convertir
      fileReader.onload = async () => {
        const base64Data = fileReader.result.split(',')[1]; //Conversion du blob en chaine de caractere
        const fileUri = FileSystem.documentDirectory + `${nom}.pdf`;//Lien dans le systeme de fichier local de l'app
        //Cette fonction met le contenu de base64Data dans l'emplacement fileUri
        FileSystem.writeAsStringAsync(fileUri, base64Data, { encoding: FileSystem.EncodingType.Base64 })
        //Récuperation du contenu se trouvant dans l'emplacement fileUri
         FileSystem.getContentUriAsync(fileUri).then((cUri) => {
            //Intent:Launcher se charge d'ouvrir le fichier dans un lecteur pdf
             IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
               data: cUri,
               flags: 1,
               type: 'application/pdf'
              });
            })
      };
    } catch (error) {
      console.error(error);
    }
  }
  //FONCTION renderIem POUR CHARGER LES FICHESTECH DE LA BD DANS LA FLATLIST
  const renderItem=({item})=>(
    <View  style={styles.listIng}>
      <View style={styles.fichInf}>
        <View>
          <FontAwesome name="file-pdf-o" size={80} color={colors.green} />
        </View>
        <View  style={{marginLeft:15}}>
          <Text style={[styles.textIng,{fontWeight:'bold', fontSize:15,color:colors.black}]}>Culture : {item.nom}</Text>
          <Text style={styles.textIng}>Cette fiche sur la {item.nom}</Text>
          <Text style={styles.textIng}>vous permet de mieux comprendre</Text>
          <Text style={styles.textIng}>les spécificités de cette culture</Text>
          <Text style={styles.textIng}>et ses qualités.</Text>
          <View style={{alignSelf:'flex-end'}}>
            <TouchableOpacity style={styles.btnOpen}  onPress={()=>OpenFile(item)}>
                <Text style={styles.txtBtn}>
                  Ouvrir
                </Text>
                <FontAwesome name="download" size={24} color={colors.green} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false} 
        data={fichesTech} //Liste des fiches techniques
        renderItem={renderItem} 
        keyExtractor={item => item.id}
      />
    </View>
  )
  }
  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:colors.whiteBlue,
      alignItems:'center'
    },
    fichInf:{
      width:280,
      height:120,
      flexDirection:'row',
      paddingHorizontal:5,
      alignItems:'center',
      justifyContent:'space-between'
    },
    listIng:{
      flexDirection:'row',
      backgroundColor:colors.white,
      padding: 10,
      borderRadius:10,
      marginVertical:20,
      elevation:2,
    },
    imgPDF:{
      width:20,
      height:50,
    },
    textIng:{
      color:colors.greyS,
      fontSize:12,
    },
    btnOpen:{ 
      padding:5,
      alignItems:'center',
      justifyContent:'center',
      marginHorizontal:25,
      flexDirection:'row'
    },
    txtBtn:{
      color:colors.green,
      borderBottomWidth:1,
      borderBottomColor:colors.green,
      marginRight:5
    }
  
  })