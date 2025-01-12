import { useState } from "react";
import { Text,  View, TextInput, TouchableOpacity, FlatList, Alert} from "react-native"
import { styles } from "./styles"
import Participant from "../../components/Participants"


export default function Home(){

  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

    function participantAdd () {
      if(participants.includes(participantName)){
        return Alert.alert('Participante Existe', 'Já existe um participante na lista com esse nome');
      };

      setParticipants(prevState => [...prevState, participantName]);
      setParticipantName('')

    }

    function participantRemove (name: string) {
      
      Alert.alert('Remover', `Remover o participante ${name}?`, [
        {
          text: 'Sim',
          onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
        },
        {
          text: 'Não',
          style: 'cancel'
        }
      ]);
    }

  return(
    <View style={styles.container}>
      <Text style={styles.text}>Nome do evento</Text>
      <Text style={styles.text2}>Sexta, 4 de Novembro de 2022.</Text>
      <View style={styles.form}>
        <TextInput 
            style={styles.input}
            placeholder="Nome do participante "
            placeholderTextColor='#6B6B6B'
            onChangeText={setParticipantName}
            value={participantName}
        />
        <TouchableOpacity style={styles.button} onPress={participantAdd}>
            <Text style={styles.buttonText}> + </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Participant 
            key={item}
            name={item}
            onRemove={() => participantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmpty}>
            Nenhum participante cadastrado!!
          </Text>
        )}
      />  
    </View>
  )
}