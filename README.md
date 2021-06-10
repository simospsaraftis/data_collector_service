# Υπολογιστική Νέφους και Υπηρεσίες - Εργαστηριακή Άσκηση 2021: Υπηρεσία Συλλογής Δεδομένων (Data Collector Service)
Ψαραύτης-Σουράνης Συμεών - [@simospsaraftis](https://github.com/simospsaraftis) - Αριθμός Μητρώου: 141049
___

## Γενικές Πληροφορίες για το Εικονικό Εργαστήριο</br>
### 1. Περιγραφή

Το συγκεκριμένο εικονικό εργαστήριο στοχεύει στο να παρέχει στον ή στους χρήστες που το χρησιμοποιούν, τη δυνατότητα αυτοματοποιημένης συλλογής και αποθήκευσης σε μία βάση δεδομένων, συμβάντων που συμβαίνουν στους κόμβους ενός σμήνους, καθώς και τη δυνατότητα γνωστοποίησης των συμβάντων αυτών στους κόμβους, με μηνύματα που στέλνονται μέσω websocket. 

Για την επίτευξη του παραπάνω στόχου, το εικονικό εργαστήριο:
- διαθέτει δικό του δίκτυο
- παρέχει πρόγραμμα για τη συλλογή των δεδομένων
- περιλαμβάνει βάση δεδομένων (Database replication)
- επιτρέπει onEvent αποθήκευση των δεδομένων στη βάση
- διαθέτει Websocket σύνδεσης με τη βάση για άμεση μεταφορά των δεδομένων<br/><br/>

### 2. Τεχνολογίες που χρησιμοποιήθηκαν

- [Ansible](https://www.ansible.com/)<br/>
Λογισμικό για την εγκατάσταση υπηρεσιών και την εκτέλεση εντολών στους κόμβους του σμήνους, απομακρυσμένα.
- [Fluentd](https://www.fluentd.org/)<br/>
Λογισμικό για τη συλλογή των δεδομένων και την onEvent αποθήκευσή τους στη βάση.
- [MongoDB](https://www.mongodb.com/)<br/>
Πρόγραμμα βάσης δεδομένων που παρέχει τον χώρο αποθήκευσης των δεδομένων.
- [Node.js](https://nodejs.org/en/)<br/>
Πλατφόρμα ανάπτυξης λογισμικού σε γλώσσα προγραμματισμού JavaScript για τη συγγραφή του κώδικα για την επικοινωνία ανάμεσα στον εξυπηρετητή (server) και τους πελάτες (clients).
- [Socket.IO](https://socket.io/)<br/>
Βιβλιοθήκη JavaScript για την επίτευξη αμφίδρομης επικοινωνίας μεταξύ του εξυπηρετητή (server) και των πελατών (clients) σε πραγματικό χρόνο.<br/><br/>


### 3. Διάγραμμα αρχιτεκτονικής εικονικού εργαστηρίου

Η αρχιτεκτονική του εικονικού εργαστηρίου που σκοπεύουμε να υλοποιήσουμε, φαίνεται στο ακόλουθο διάγραμμα:

![Vlab Final](./docs/images/vlab_diagram.png)<br/><br/>

Πληροφορίες για την εγκατάσταση του εικονικού εργαστηρίου μπορείτε να βρείτε στο αρχείο [INSTALL](/docs/INSTALL.md)

Πληροφορίες για τη χρήση του εικονικού εργαστηρίου μπορείτε να βρείτε στο αρχείο [USAGE](/docs/USAGE.md)
