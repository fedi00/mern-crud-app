import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const VoiceRecognition = () => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null); // Stocker l'instance de reconnaissance

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const newRecognition = new SpeechRecognition();

    newRecognition.continuous = true; // Reconnaissance continue
    newRecognition.interimResults = true; // Permet les résultats intermédiaires
    newRecognition.lang = 'fr-FR'; // Langue française

    // Ajouter les événements pour traiter les résultats
    newRecognition.onresult = (event) => {
      let finalTranscript = ''; // Texte finalisé

      for (let i = event.resultIndex; i < event.results.length; i++) {
        // Vérifier si le résultat est final
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }

      // Ajouter uniquement le texte final au texte existant
      if (finalTranscript) {
        setText((prevText) => prevText + ' ' + finalTranscript);
      }
    };

    newRecognition.onerror = (event) => {
      console.error('Error during speech recognition:', event.error);
      setIsListening(false);
    };

    setRecognition(newRecognition); // Stocker l'instance
  }, []); // Le useEffect ne s'exécute qu'une seule fois

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      message: text, // Le contenu du textarea
      to_email: 'fedi.benkhlifa@esprit.tn', // Remplace par l'email du destinataire
      subject: 'PV Réunion',
    };

    emailjs.send(
      'service_3r3n9ni', // Remplace par ton service ID
      'template_2fxrxmn', // Remplace par ton template ID
      templateParams,
      'ml64pTJ-oZorCfxtN' // Remplace par ton user ID
    )
    .then((response) => {
      console.log('Email envoyé avec succès!', response.status, response.text);
    }, (err) => {
      console.error('Erreur lors de l\'envoi de l\'email:', err);
    });
  };

  return (
    <div style={styles.container}>
      <h1>Reconnaissance Vocale</h1>
      <button onClick={isListening ? stopListening : startListening} style={styles.button}>
        {isListening ? 'Arrêter' : 'Commencer'}
      </button>
      <textarea
        value={text}
        readOnly
        rows={10}
        style={styles.textarea}
        placeholder="Le texte reconnu apparaîtra ici..."
      />
      <button onClick={sendEmail} style={styles.sendButton}>
        Envoyer par email
      </button>
    </div>
  );
};

// Styles CSS
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  button: {
    marginBottom: '20px',
width:'200px',    fontSize: '16px',
    cursor: 'pointer',
  },
  textarea: {
    width: '80%',
    height: '200px',
    fontSize: '16px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    resize: 'none',
  },
  sendButton: {
    marginTop: '20px',
    width:'200px',
        fontSize: '16px',
    cursor: 'pointer',
  },
};

export default VoiceRecognition;
