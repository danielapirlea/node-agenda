function loadContacts() {
    $.ajax('data/contacts.json').done(function (contacts) {
        console.info('contacts loaded', contacts);
        displayContacts(contacts);
    });
}

function getNewRow() {
    return `<tr>
    <td><input type="text" name="firstName" placeholder="First Name"/></td>
    <td><input type="text" name="lastName" placeholder="Last Name"/></td>
    <td><input type="text" name="phone" placeholder="Phone"/></td>
    <td><button onclick="saveContact()">Save</button></td
</tr>`;
}

function saveContact() {
    var lastName = document.querySelector('input[name=firstName]').value;
    var firstName = $('input[name=lastName]').val();
    var phone = $('input[name=phone]').val();
    console.debug('saveContact...', firstName, lastName, phone);
    $.post('contacts/create', {
        firstName, //shortcut from ES6 (key is the same as value variable name)
        lastName,
        phone // ESS (key = value)
    }).done(function(response){
        console.warn('done create contact', response);
        if (response.succes) {
            
        }
    });
};

function displayContacts(contacts) {
    var rows = contacts.map(function (contact) {
        console.log('transform contact', contact);
        return `<tr>
            <td>${contact.firstName}</td>
            <td>${contact.lastName}</td>
            <td>${contact.phone}</td>
            <td><a href="/contacts/delete?phone=${contact.phone}">x</a></td
        </tr>`;
    });
    console.warn('rows', rows);
   
    // rows.push(getNewRow()); simplified
    var actions = getNewRow();
    rows.push(actions);

    document.querySelector('tbody').innerHTML = rows.join('');
}

// -start app

loadContacts();