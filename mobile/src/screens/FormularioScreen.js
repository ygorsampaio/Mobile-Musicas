import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import api from '../services/api';

export default function FormularioScreen({ route, navigation }) {
  const musicaExistente = route.params?.musica;

  const [titulo, setTitulo] = useState(musicaExistente?.titulo || '');
  const [artista, setArtista] = useState(musicaExistente?.artista || '');
  const [genero, setGenero] = useState(musicaExistente?.genero || '');
  const [nota, setNota] = useState(musicaExistente?.nota?.toString() || '');

  async function salvar() {
    if (!titulo || !artista) {
      Alert.alert('Atenção', 'Título e artista são obrigatórios');
      return;
    }

    const dados = {
      titulo,
      artista,
      genero,
      nota: parseInt(nota) || 0,
    };

    try {
      if (musicaExistente) {
        await api.put(`/musicas/${musicaExistente.id}`, dados);
        Alert.alert('Sucesso', 'Música atualizada!');
      } else {
        await api.post('/musicas', dados);
        Alert.alert('Sucesso', 'Música cadastrada!');
      }
      navigation.goBack();
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível salvar a música');
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Título *</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Ex: Bohemian Rhapsody"
      />

      <Text style={styles.label}>Artista *</Text>
      <TextInput
        style={styles.input}
        value={artista}
        onChangeText={setArtista}
        placeholder="Ex: Queen"
      />

      <Text style={styles.label}>Gênero</Text>
      <TextInput
        style={styles.input}
        value={genero}
        onChangeText={setGenero}
        placeholder="Ex: Rock"
      />

      <Text style={styles.label}>Nota (1 a 5)</Text>
      <TextInput
        style={styles.input}
        value={nota}
        onChangeText={setNota}
        placeholder="Ex: 5"
        keyboardType="numeric"
        maxLength={1}
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvar}>
        <Text style={styles.botaoTexto}>
          {musicaExistente ? 'Salvar alterações' : 'Cadastrar música'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    fontSize: 15,
  },
  botaoSalvar: {
    backgroundColor: '#4A90D9',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
