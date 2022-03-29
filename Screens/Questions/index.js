import React from 'react';
import { SafeAreaView, Text, ScrollView } from 'react-native';
import styles from './style';

export default function Questions({ navigation, route }) {
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.questionsContainer}>
                <Text style={styles.questionText}>
                    Para que serve o aplicativo?
                </Text>
                <Text style={styles.answerText}>
                    O aplicativo serve para que você possa se 
                    conscientizar sobre a Engenharia Social
                </Text> 
                <Text style={styles.questionText}>
                    Como funciona o aplicativo?
                </Text>
                <Text style={styles.answerText}>
                    O aplicativo é composto por módulos que contém
                    o conteúdo de estudo sobre Engenharia Social,
                    os testes que servem para avaliar seu 
                    conhecimento adquirido ao longo da leitura dos módulos e o 
                    histórico que exibe o seu desempenho nos testes.   
                </Text>
                <Text style={styles.questionText}>
                    O que é a Engenharia Social?
                </Text>
                <Text style={styles.answerText}>
                    Engenharia social é a ciência que estuda formas de
                    "hackear" o cérebro humano a fim de induzir um 
                    indivíduo a realizar ações que podem ou não ser 
                    de seu interesse. Saiba mais na seção
                    de <Text 
                        onPress={() => navigation.navigate('Modules', {userId: route.params.userId})}
                        style={styles.linkText}
                    >
                    Módulos</Text> localizada no Menu.
                </Text>
                <Text style={styles.questionText}>
                    Qual conteudo os módulos possem?
                </Text>
                <Text style={styles.answerText}>
                    Os módulos possuem informações teoricas sobre 
                    a Engenharia Social, além de imagens ilustrativas,
                    exemplos de ataques e formas de se defender de 
                    eventuais ataques.
                </Text>
                <Text style={styles.questionText}>
                    Como funciona o teste?
                </Text>
                <Text style={styles.answerText}>
                    Os testes são aleatóriamente escolhidos de 
                    acordo com o assunto que o usuário está estudando
                    ou que foi escolhido na seção de 
                    <Text
                        onPress={() => navigation.navigate('Tests', {userId: route.params.userId})}
                        style={styles.linkText}
                    > Testes</Text>
                </Text>
                <Text style={styles.questionText}>
                    Os testes são feitos de acordo com o conteúdo de
                    cada módulo?
                </Text>
                <Text style={styles.answerText}>
                    Sim testes são feitos de acordo com o conteúdo 
                    dos módulos, porém cada teste é unico e aplicado
                    de forma aleatória.
                </Text>
                <Text style={styles.questionText}>
                    Preciso de internet para usar o aplicativo?
                </Text>
                <Text style={styles.answerText}>
                    Sim é necessário ter uma conexão com a internet pois
                    o aplicativo requer acesso a um banco de dados para
                    "pegar" os dados dos módulos, testes e histórico. Além
                    disso o aplicativo utiliza da conexão para armazenar
                    os dados de realização dos testes do usuário.
                </Text>
                <Text style={styles.questionText}>
                    Como meus dados são salvos no banco? Preiso criar uma
                    conta? 
                </Text>
                <Text style={styles.answerText}>
                    Não é necessário criar uma conta pois o aplicativo gera
                    automaticamente um usuário anônimo após o término da introdução 
                    (mensagens apresentadas ao abrir o aplicativo pela primeira vez),
                    desta forma a identidade do usuário se mantém oculta.
                </Text>
                <Text style={styles.questionText}>
                    Como funciona o cálculo das notas?
                </Text>
                <Text style={styles.answerText}>
                    Para a nota inicial o cálculo é baseado no peso da alternativa
                    escolhida nos testes iniciais, isso porque tais testes não possuem
                    resposta certa ou errada. Para a nota gerada pelo usuário ao realizar
                    os testes, o cálculo é baseado no numero de acertos e total de questões
                    realizadas. Dividi-se o total de acertos pelo total de questões e
                    multiplica-se por 10, assim gerando a nota atual.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}