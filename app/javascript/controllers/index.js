// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"

import ApplyController from "./apply_controller"
application.register("apply", ApplyController)

import ConnectWalletController from "./connect_wallet_controller"
application.register("connect-wallet", ConnectWalletController)

import CountdownController from "./countdown_controller"
application.register("countdown", CountdownController)

import CreatorCheckController from "./creator_check_controller"
application.register("creator-check", CreatorCheckController)

import CreatorController from "./creator_controller"
application.register("creator", CreatorController)

import DonationController from "./donation_controller"
application.register("donation", DonationController)

import GetCreatorForFilController from "./get_creator_for_fil_controller"
application.register("get-creator-for-fil", GetCreatorForFilController)

import GetCreatorForRaffleController from "./get_creator_for_raffle_controller"
application.register("get-creator-for-raffle", GetCreatorForRaffleController)

import RaffleTicketsController from "./raffle_tickets_controller"
application.register("raffle-tickets", RaffleTicketsController)
