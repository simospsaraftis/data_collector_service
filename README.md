# Υπολογιστική Νέφους και Υπηρεσίες - Εργαστηριακή Άσκηση 2021: Υπηρεσία Συλλογής Δεδομένων (Data Collector Service)
[@simospsaraftis](https://github.com/simospsaraftis)

## Γενικές Πληροφορίες για την Εφαρμογή

### 1. Περιγραφή

Το παρόν project με όνομα [data_collector_service](https://github.com/simospsaraftis/data_collector_service.git) παρέχει μια εφαρμογή που επιτρέπει την αυτοματοποιημένη συλλογή και αποθήκευση σε μία βάση δεδομένων, συμβάντων που συμβαίνουν στους κόμβους ενός σμήνους, καθώς και τη γνωστοποίηση των συμβάντων αυτών στους κόμβους του σμήνους, με μηνύματα που στέλνονται μέσω websocket. 

Για την επίτευξη των παραπάνω, η εφαρμογή:
- διαθέτει δικό της δίκτυο
- παρέχει πρόγραμμα για τη συλλογή των δεδομένων/συμβάντων
- περιλαμβάνει βάση δεδομένων (Database replication)
- επιτρέπει onEvent αποθήκευση των δεδομένων/συμβάντων στη βάση
- διαθέτει change stream για την άμεση ανίχνευση και μεταφορά των δεδομένων/συμβάντων από τη βάση στον κεντρικό κόμβο (master)
- διαθέτει websocket σύνδεσης του κεντρικού κόμβου (master) με τους υπόλοιπους κόμβους (workers), για άμεση μεταφορά των δεδομένων/συμβάντων σε αυτούς<br/><br/>


Για τη δημιουργία του σμήνους, αξιοποιείται η υπηρεσία [hybrid-linux](https://git.swarmlab.io:3000/swarmlab/hybrid-linux), που παρέχεται από το περιβάλλον [swarmlab.io](http://docs.swarmlab.io/), η εγκατάσταση και η διάθεση της οποίας πραγματοποιείται μέσω του εργαλείου [docker](https://www.docker.com/).

Για την υποστήριξη 'χώρου αποθήκευσης', αξιοποιείται η υπηρεσία [storage-mongo-replica](https://git.swarmlab.io:3000/swarmlab/storage-mongo-replica), που επίσης παρέχεται από το περιβάλλον [swarmlab.io](http://docs.swarmlab.io/).


### 2. Τεχνολογίες που χρησιμοποιούνται

- [Ansible](https://www.ansible.com/)<br/>
Λογισμικό για την εγκατάσταση υπηρεσιών και την εκτέλεση εντολών στους κόμβους του σμήνους, απομακρυσμένα.
- [Fluentd](https://www.fluentd.org/)<br/>
Λογισμικό για τη συλλογή των δεδομένων/συμβάντων και την αποθήκευσή τους στη βάση δεδομένων.
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
