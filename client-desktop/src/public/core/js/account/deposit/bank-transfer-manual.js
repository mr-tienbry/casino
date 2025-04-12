"use strict";


$(document).ready(() => {
    initMethodDeposit = new BankTransferManual();
    initMethodDeposit.getListBankManual();
    initMethodDeposit.getListBankDeposit();

    $('.bank-provide-select').on("change", function () {
        initMethodDeposit.showInfoBank($(this));
    });
    $("#amount").keyup(function () { initMethodDeposit.onChangedAmount($(this)) });
    // submit deposit
    $(".btn-submit-deposit").on("click", function () { initMethodDeposit.submitDeposit($(this)) });
});