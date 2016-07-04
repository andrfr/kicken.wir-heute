Template.date.onRendered(function() {
    this.autorun(function() {
        if (document.querySelector('.info-box__btn') != null) {

            document.querySelector('.info-box__btn').addEventListener('click', function() {
                classie.toggleClass(document.querySelector('.info-box'), 'is-active');
                classie.toggleClass(document.querySelector('.info-box__overlay'), 'is-active');
            });
        }

    });
});
