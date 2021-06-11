# Υπολογιστική Νέφους και Υπηρεσίες - Εργαστηριακή Άσκηση 2021: Υπηρεσία Συλλογής Δεδομένων (Data Collector Service)
[@simospsaraftis](https://github.com/simospsaraftis)

## Γενικές Πληροφορίες για την Εφαρμογή

### 1. Περιγραφή

Η συγκεκριμένη εφαρμογή στοχεύει στο να παρέχει στον ή στους χρήστες που τη χρησιμοποιούν, τη δυνατότητα αυτοματοποιημένης συλλογής και αποθήκευσης σε μία βάση δεδομένων, συμβάντων που συμβαίνουν στους κόμβους ενός σμήνους, καθώς και τη δυνατότητα γνωστοποίησης των συμβάντων αυτών στους κόμβους, με μηνύματα που στέλνονται μέσω websocket. 

Για την επίτευξη του παραπάνω στόχου, η εφαρμογή:
- διαθέτει δικό της δίκτυο
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


### 3. Διάγραμμα αρχιτεκτονικής της εφαρμογής

Η αρχιτεκτονική της εφαρμογής, φαίνεται στο ακόλουθο διάγραμμα:

![App Diagram](./images/app_diagram.png)<br/><br/>

Πληροφορίες για την εγκατάσταση της εφαρμογής μπορείτε να βρείτε στο αρχείο [INSTALL](./INSTALL.md)

Πληροφορίες για τη χρήση της εφαρμογής μπορείτε να βρείτε στο αρχείο [USAGE](./USAGE.md)
