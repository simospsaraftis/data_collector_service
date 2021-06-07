# Data Collector Service
## Περιγραφή

Το συγκεκριμένο εικονικό εργαστήριο παρέχει στο χρήστη τη δυνατότητα συλλογής δεδομένων (Data collection).</br>
Για να το επιτύχει αυτό, το εικονικό εργαστήριο:
- διαθέτει δικό του δίκτυο
- παρέχει πρόγραμμα για τη συλλογή των δεδομένων
- επιτρέπει onEvent - τοπική/προσωρινή αποθήκευση των δεδομένων
- περιλαμβάνει βάση δεδομένων (Database replication)
- επιτρέπει onEvent αποθήκευση των δεδομένων στη βάση
- διαθέτει Websocket σύνδεσης με τη βάση για άμεση μεταφορά των δεδομένων

## Τεχνολογίες που χρησιμοποιήθηκαν

- [Ansible](https://www.ansible.com/)
- [Fluentd](https://www.fluentd.org/)
- [MongoDB](https://www.mongodb.com/)
- [Socket.IO](https://socket.io/)
- [Node.js](https://nodejs.org/en/)

