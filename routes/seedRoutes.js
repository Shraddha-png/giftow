const express = require('express');
const Product = require('../models/productModel');
const NoteDir = require('../models/notedirModel.js');
const Notebook = require('../models/notebookModel.js');
const Tshirt = require('../models/tshirtsModel.js')
const data = require('../data.js')
// const User = require('../models/userModel');
const FrostedMug = require('../models/frostedMugsModel.js');
const Award = require('../models/awardModel.js');
const Badge = require('../models/badgesModel.js');
const Bag = require('../models/bagModel.js');
const Mug = require('../models/mugModel.js');
const Couplemug = require('../models/couplemugModel.js');
const Hotcoldsippers = require('../models/hotcoldsipperModel.js');
const Travelmug = require('../models/travelmugModel.js');
const Diary = require('../models/diaryModel.js');
const Mgnameplate = require('../models/mgnameplateModel.js');
const Mousepad = require('../models/mousepadModel.js');
const Mobilehold = require('../models/mobileholdModel.js');
const Clothing = require('../models/clothingModel.js');
const Pendrive = require('../models/pendriveModel.js');
const Bearmug = require('../models/bearmugModel.js');
const Magicmug = require('../models/magicmugModel.js');
const Stationeries = require('../models/stationerieModel.js');
const Shotglass = require('../models/shotglassesModel.js');
const Giftset = require('../models/giftsetModel.js');
const Singleawllsipper = require('../models/single_wall_sipperModel.js');
const Plasticsipper = require('../models/plasticsipperModel.js');
const Copperbottle = require('../models/copperbottleModel.js');
const Antiskitbottles = require('../models/antiskitbottleModel.js');
const Borosilicatesipper = require('../models/borosilicateglassbottleModel.js');
const Bomboobottles = require('../models/bomboobottlesModel.js');
const Shakkerbottle = require('../models/shakerbottleModel.js');
const Roundmagbadge = require('../models/roundmagbadgeModel.js');
const Pocmgbadge = require('../models/pockbadgeModel.js');
const Metalmgbadge = require('../models/metalmgbadgeModel.js');
const Roundpinbadge = require('../models/roundpinbadgeModel.js');
const Acrylicbadge = require('../models/acrybadgeModel.js');
const Clipnamebadge = require('../models/clipbadgeModel.js');
const Dombadge = require('../models/dommgbadgeModel.js');
const Ovalbadge = require('../models/ovalbadgeModel.js');
const Laptopslv = require('../models/laptopslvsModel');
const Pinnmplate = require('../models/pinnmplateModel');
const Domnmplate = require('../models/domnmplateModel');
const Metalnmplate = require('../models/metalnlplatModel');
const Acrynmplate = require('../models/acrynmplateModel');
const Power_Bank = require('../models/power_bankModel');
const Digitalph_frame = require('../models/digitalphframe_Model.js');
const Tablelamp = require('../models/tablelampsModel.js');
const Digital_Clock = require('../models/digitalclockModels');
const Photo_Frame = require('../models/photo_frameModel');
const Keychain = require('../models/keychainModel');
const LunchBox = require('../models/lunch_boxModel');
const Kettle = require('../models/kettleModel');
const Card_Holder = require('../models/Card_holderModel');
const Best_Seller = require('../models/best_sellerModel');
const Fridge_Magnet = require('../models/fridge_mgnetModel');
const Paper_mug = require('../models/paper_mugModel.js');
const Coaster = require('../models/coasterModel');
const Band = require('../models/bandModel');
const Bamboomug = require('../models/bambooModel');
const Brochure = require('../models/brochureModel');
const Standee = require('../models/standeeModel');
const Occasion = require('../models/occasionModel');
const Printing = require('../models/printingModel');
const Teach_Acc = require('../models/teachaccModel');
const Sublimation_item = require('../models/sublimation_itemModel');
const Container = require('../models/containerModel');
const Desk_Stand = require('../models/desk_standModel');
const Jutebag = require('../models/jutebagModel');
const Totebag = require('../models/totebagModel');
const Bagpack = require('../models/bagpackModel');
const Card_PenDrive = require('../models/card_pen_driveModel');
const Calenders = require('../models/calenderModel');
const Flyer_pamplate = require('../models/flyer_pamplateModel');
const Bookmarks = require('../models/bookmarkModel');
const Folder = require('../models/folderModel');
const Magzine = require('../models/magzineModel');
const TrainingMannual = require('../models/training_mannualModel');
const Annual_Report = require('../models/annual_reportModel');
const Document_printing = require('../models/document_printingModel');
const Project_Report = require('../models/project_reportModel');
const Sticker = require('../models/stickerModel');
const Notepad = require('../models/notepadMdel');
const Sipper = require('../models/sipperModel');
const Family = require('../models/family_tishirtModel');
const Fullsleave_tshirt = require('../models/fullsleave_tshirtModel.js');
const Girls_tshirt = require('../models/girls_tshirtModel');
const Couple_tshirt = require('../models/couple_tshirtModel');
const Sport_tshirt = require('../models/sport_tshirtModel');
const Polo_tshirt = require('../models/polo_tshirtModel');
const Dry_fit_tshirt = require('../models/dry_fit_tshirtModel');
const Hoodies = require('../models/hoodiesModel');
const Cap = require('../models/capModel');
const Wallet = require('../models/walletModel');
const Certificate = require('../models/certificateModel');
const Cushion_covers = require('../models/Cushion_coverModel');
const Magnetic_photoframe = require('../models/meg_photo_frameModel');
const Acrylic_photo_frame = require('../models/acrylic_photo_frameModel');
const Id_landyard = require('../models/id_landyardModel');
const Pencil = require('../models/pencilModel');
const Chechbook_Cover = require('../models/checkbook_coverModel');
const Clutches = require('../models/clutchesModel');
const Slingbag = require('../models/slingbagsModel');
const Travelbag = require('../models/travelbagModel');
const Schoolbag = require('../models/schoolbagsModel');
const Non_wovenbag = require('../models/non_wovenbagModel');
const Wildcraft = require('../models/wildcraftbagModel');
const Headphone = require('../models/headphoneModel');
const Laptop_skin = require('../models/laptopskinModel');
const Mobile_accessories = require('../models/mobileaccessoriesModel');
const Magnifire = require('../models/magnifiresModel');
const Cushion = require('../models/cushionModel');
const Bag_Wallet = require('../models/bag_walletsModel');
const Bottle_sipper = require('../models/bottle_sippersModel');
const Giftcard = require('../models/giftcardmodel');
const Poster = require('../models/posterModel');
const Stamp = require('../models/stampModel');
const Tag = require('../models/tagModel');
const SustainablesItems = require('../models/sustainablesItemsModel');
const PramotionalPro = require('../models/pramothionalProMoodel');
const Speaker = require('../models/speakerModel');
const Pen = require('../models/penModel');
const Mouse_Key = require('../models/mouse_keyboardModel');
const Rubikcubs = require('../models/rubikcubeModel');
const GlassTumb = require('../models/glasstumbModel');
const Desktop_Item = require('../models/desktopitemModel');

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
    try {
        await Product.deleteMany({});
        const createdProducts = await Product.insertMany(data.products);

        await NoteDir.deleteMany({});
        const createdNoteDir = await NoteDir.insertMany(data.notedirs);

        await Notebook.deleteMany({});
        const createdNotebook = await Notebook.insertMany(data.notebooks);

        // Tshirts Seed Router
        await Tshirt.deleteMany({});
        const createdTshirts = await Tshirt.insertMany(data.tshirts);

        //Frosted mugs Router
        await FrostedMug.deleteMany({});
        const createdFrostedMugs = await FrostedMug.insertMany(data.frostedMugs);

        //Awards mugs Router
        await Award.deleteMany({});
        const createdAwards = await Award.insertMany(data.awards);

        //Badge Router
        await Badge.deleteMany({});
        const createdBadges = await Badge.insertMany(data.badges);

        //Bag Router
        await Bag.deleteMany({});
        const createdBags = await Bag.insertMany(data.bags);

        //Mug Router
        await Mug.deleteMany({});
        const createdMugs = await Mug.insertMany(data.mugs);

        //Couplemug Router
        await Couplemug.deleteMany({});
        const createdCouplemugs = await Couplemug.insertMany(data.couplemugs);

        //Hotcoldsippers Router
        await Hotcoldsippers.deleteMany({});
        const createdHotcoldsipper = await Hotcoldsippers.insertMany(data.hotcoldsippers);

        //Diary Router
        await Diary.deleteMany({});
        const createdDiary = await Diary.insertMany(data.diaries);

        //Travelmug Router
        await Travelmug.deleteMany({});
        const createdTravelmug = await Travelmug.insertMany(data.travelmugs);

        //Mgnameplate Router
        await Mgnameplate.deleteMany({});
        const createdMgnameplate = await Mgnameplate.insertMany(data.mgnameplates);

        //Mousepad Router
        await Mousepad.deleteMany({});
        const createdMousepad = await Mousepad.insertMany(data.mousepads);

        //Mobilehold Router
        await Mobilehold.deleteMany({});
        const createdMobilehold = await Mobilehold.insertMany(data.mobileholds);

        //Clothing Router
        await Clothing.deleteMany({});
        const createdClothing = await Clothing.insertMany(data.clothings);

        //Pendrive Router
        await Pendrive.deleteMany({});
        const createdPendrive = await Pendrive.insertMany(data.pendrives);

        //Bearmug Router
        await Bearmug.deleteMany({});
        const createdBearmug = await Bearmug.insertMany(data.bearmugs);

        //Magicmug Router
        await Magicmug.deleteMany({});
        const createdMagicmug = await Magicmug.insertMany(data.magicmugs);

        //Stationeries Router
        await Stationeries.deleteMany({});
        const createdStationeries = await Stationeries.insertMany(data.stationeries);

        //Shotglass Router
        await Shotglass.deleteMany({});
        const createdShotglass = await Shotglass.insertMany(data.shotglasses);

        //Giftset Router
        await Giftset.deleteMany({});
        const createdGiftset = await Giftset.insertMany(data.giftsets);


        await Singleawllsipper.deleteMany({});
        const createdSingleawllsipper = await Singleawllsipper.insertMany(data.singlwallsippers);

        await Plasticsipper.deleteMany({});
        const createdPlasticsipper = await Plasticsipper.insertMany(data.plasticsippers);

        await Copperbottle.deleteMany({});
        const createdCopperbottle = await Copperbottle.insertMany(data.copperbottles);

        await Antiskitbottles.deleteMany({});
        const createdAntiskitbottles = await Antiskitbottles.insertMany(data.antiskitbottles);

        await Borosilicatesipper.deleteMany({});
        const createdBorosilicatesipper = await Borosilicatesipper.insertMany(data.borosilicategalssbottles);

        await Bomboobottles.deleteMany({});
        const createdBomboobottles = await Bomboobottles.insertMany(data.bomboobottles);

        await Shakkerbottle.deleteMany({});
        const createdShakkerbottle = await Shakkerbottle.insertMany(data.shakerbottles);

        await Roundmagbadge.deleteMany({});
        const createdRoundmagbadge = await Roundmagbadge.insertMany(data.roundmgbadges);

        await Pocmgbadge.deleteMany({});
        const createdPocmgbadge = await Pocmgbadge.insertMany(data.pocmagbadges);

        await Metalmgbadge.deleteMany({});
        const createdMetalmgbadge = await Metalmgbadge.insertMany(data.metnamebadges);

        await Roundpinbadge.deleteMany({});
        const createdRoundpinbadge = await Roundpinbadge.insertMany(data.roundpinbadges);

        await Acrylicbadge.deleteMany({});
        const createdAcrylicbadge = await Acrylicbadge.insertMany(data.acrynamebadges);

        await Clipnamebadge.deleteMany({});
        const createdClipnamebadge = await Clipnamebadge.insertMany(data.clipplabadges);

        await Dombadge.deleteMany({});
        const createdDombadge = await Dombadge.insertMany(data.dommagbadges);

        await Ovalbadge.deleteMany({});
        const createdOvalbadge = await Ovalbadge.insertMany(data.ovlmgbadges);

        await Laptopslv.deleteMany({});
        const createdLaptopslv = await Laptopslv.insertMany(data.laptopsleeves);

        await Pinnmplate.deleteMany({});
        const createdPinnmplate = await Pinnmplate.insertMany(data.pinnmplates);

        await Domnmplate.deleteMany({});
        const createdDomnmplate = await Domnmplate.insertMany(data.domnmplates);

        await Metalnmplate.deleteMany({});
        const createdMetalnmplate = await Metalnmplate.insertMany(data.metlnmplates);

        await Acrynmplate.deleteMany({});
        const createdAcrynmplate = await Acrynmplate.insertMany(data.acrnmplates);

        await Tablelamp.deleteMany({});
        const createdTablelamp = await Tablelamp.insertMany(data.tablelamps);

        await Digital_Clock.deleteMany({});
        const createdDigital_Clock = await Digital_Clock.insertMany(data.digitalclocks);

        await Power_Bank.deleteMany({});
        const createdPower_Bank = await Power_Bank.insertMany(data.power_banks);

        await Digitalph_frame.deleteMany({});
        const createdDigitalph_frame = await Digitalph_frame.insertMany(data.digitalphframes);

        await Photo_Frame.deleteMany({});
        const createdPhoto_Frame = await Photo_Frame.insertMany(data.photoframes);

        await Keychain.deleteMany({});
        const createdKeychain = await Keychain.insertMany(data.keychains);

        await LunchBox.deleteMany({});
        const createdLunchBox = await LunchBox.insertMany(data.lunchBoxes);

        await Kettle.deleteMany({});
        const createdKettle = await Kettle.insertMany(data.kettles);

        await Card_Holder.deleteMany({});
        const createdCard_Holder = await Card_Holder.insertMany(data.card_holders);

        await Best_Seller.deleteMany({});
        const createdBest_Seller = await Best_Seller.insertMany(data.best_sellers);

        await Fridge_Magnet.deleteMany({});
        const createdFridge_Magnet = await Fridge_Magnet.insertMany(data.fridgeMagnets);

        await Paper_mug.deleteMany({});
        const createdPaper_mug = await Paper_mug.insertMany(data.paper_mugs);

        await Coaster.deleteMany({});
        const createdCoaster = await Coaster.insertMany(data.coasters);

        await Band.deleteMany({});
        const createdBand = await Band.insertMany(data.bands);

        await Bamboomug.deleteMany({});
        const createdBamboomug = await Bamboomug.insertMany(data.bomboomugs);

        await Brochure.deleteMany({});
        const createdBrochure = await Brochure.insertMany(data.brochures);

        await Standee.deleteMany({});
        const createdStandee = await Standee.insertMany(data.standees);

        await Occasion.deleteMany({});
        const createdOccasion = await Occasion.insertMany(data.occasions);

        await Printing.deleteMany({});
        const createdPrinting = await Printing.insertMany(data.printings);

        await Teach_Acc.deleteMany({});
        const createdTeach_Acc = await Teach_Acc.insertMany(data.teachaccesories);

        await Sublimation_item.deleteMany({});
        const createdSublimation_item = await Sublimation_item.insertMany(data.sublimation_items);

        await Container.deleteMany({});
        const createdContainer = await Container.insertMany(data.containers);

        await Desk_Stand.deleteMany({});
        const createdDesk_Stand = await Desk_Stand.insertMany(data.desk_stands);

        await Jutebag.deleteMany({});
        const createdJutebag = await Jutebag.insertMany(data.jutebags);

        await Totebag.deleteMany({});
        const createdTotebag = await Totebag.insertMany(data.totebags);

        await Bagpack.deleteMany({});
        const createdBagpack = await Bagpack.insertMany(data.bagpacks);

        await Card_PenDrive.deleteMany({});
        const createdCard_PenDrive = await Card_PenDrive.insertMany(data.cardpendrives);


        await Calenders.deleteMany({});
        const createdCalenders = await Calenders.insertMany(data.calenders);

        await Flyer_pamplate.deleteMany({});
        const createdFlyer_pamplate = await Flyer_pamplate.insertMany(data.flyer_pamplates);

        await Bookmarks.deleteMany({});
        const createdBookmarks = await Bookmarks.insertMany(data.bookmarks);

        await Folder.deleteMany({});
        const createdFolder = await Folder.insertMany(data.folders);

        await Magzine.deleteMany({});
        const createdMagzine = await Magzine.insertMany(data.magzines);

        await TrainingMannual.deleteMany({});
        const createdTrainingMannual = await TrainingMannual.insertMany(data.training_mannuals);

        await Annual_Report.deleteMany({});
        const createdAnnual_Report = await Annual_Report.insertMany(data.annual_Reports);

        await Document_printing.deleteMany({});
        const createdDocument_printing = await Document_printing.insertMany(data.document_printings);

        await Project_Report.deleteMany({});
        const createdProject_Report = await Project_Report.insertMany(data.project_reports);

        await Sticker.deleteMany({});
        const createdSticker = await Sticker.insertMany(data.stickers);

        await Notepad.deleteMany({});
        const createdNotepad = await Notepad.insertMany(data.notepads);

        await Sipper.deleteMany({});
        const createdSipper = await Sipper.insertMany(data.sippers);

        await Family.deleteMany({});
        const createdFamily = await Family.insertMany(data.family_tshirts);

        await Fullsleave_tshirt.deleteMany({});
        const createdFullsleave_tshirt = await Fullsleave_tshirt.insertMany(data.fullsleave_tshirts);

        await Girls_tshirt.deleteMany({});
        const createdGirls_tshirt = await Girls_tshirt.insertMany(data.girls_tshirts);

        await Couple_tshirt.deleteMany({});
        const createdCouple_tshirt = await Couple_tshirt.insertMany(data.couple_tshirts);

        await Sport_tshirt.deleteMany({});
        const createdSport_tshirt = await Sport_tshirt.insertMany(data.sports_tshirts);

        await Polo_tshirt.deleteMany({});
        const createdPolo_tshirt = await Polo_tshirt.insertMany(data.polo_tshirts);

        await Dry_fit_tshirt.deleteMany({});
        const createdDry_fit_tshirt = await Dry_fit_tshirt.insertMany(data.dry_fit_tshirts);

        await Hoodies.deleteMany({});
        const createdHoodies = await Hoodies.insertMany(data.hoodies);

        await Cap.deleteMany({});
        const createdCap = await Cap.insertMany(data.caps);

        await Wallet.deleteMany({});
        const createdWallet = await Wallet.insertMany(data.wallets);

        await Certificate.deleteMany({});
        const createdCertificate = await Certificate.insertMany(data.certificates);

        await Cushion_covers.deleteMany({});
        const createdCushion_covers = await Cushion_covers.insertMany(data.cushion_covers);

        await Magnetic_photoframe.deleteMany({});
        const createdMagnetic_photoframe = await Magnetic_photoframe.insertMany(data.magnetic_photoframes);

        await Acrylic_photo_frame.deleteMany({});
        const createdAcrylic_photo_frame = await Acrylic_photo_frame.insertMany(data.acrylic_photoprints);

        await Id_landyard.deleteMany({});
        const createdId_landyard = await Id_landyard.insertMany(data.id_landyards);

        await Pencil.deleteMany({});
        const createdPencil = await Pencil.insertMany(data.pencils);

        await Chechbook_Cover.deleteMany({});
        const createdChechbook_Cover = await Chechbook_Cover.insertMany(data.checkbook_covers);

        await Clutches.deleteMany({});
        const createdClutches = await Clutches.insertMany(data.clutches);

        await Slingbag.deleteMany({});
        const createdSlingbag = await Slingbag.insertMany(data.slingbags);

        await Travelbag.deleteMany({});
        const createdTravelbag = await Travelbag.insertMany(data.travelbags);

        await Schoolbag.deleteMany({});
        const createdSchoolbag = await Schoolbag.insertMany(data.schoolbags);

        await Non_wovenbag.deleteMany({});
        const createdNon_wovenbag = await Non_wovenbag.insertMany(data.non_wovenbags);

        await Wildcraft.deleteMany({});
        const createdWildcraft = await Wildcraft.insertMany(data.wildcraftbags);

        await Headphone.deleteMany({});
        const createdHeadphone = await Headphone.insertMany(data.headphones);

        await Laptop_skin.deleteMany({});
        const createdLaptop_skin = await Laptop_skin.insertMany(data.laptop_skins);

        await Mobile_accessories.deleteMany({});
        const createdMobile_accessories = await Mobile_accessories.insertMany(data.mobile_accessories);

        await Magnifire.deleteMany({});
        const createdMagnifire = await Magnifire.insertMany(data.magnifires);

        await Cushion.deleteMany({});
        const createdCushion = await Cushion.insertMany(data.cushions);

        await Bag_Wallet.deleteMany({});
        const createdBag_Wallet = await Bag_Wallet.insertMany(data.bags_wallets);

        await Bottle_sipper.deleteMany({});
        const createdBottle_sipper = await Bottle_sipper.insertMany(data.bottle_sippers);

        await Giftcard.deleteMany({});
        const createdGiftcard = await Giftcard.insertMany(data.giftcards);

        await Poster.deleteMany({});
        const createdPoster = await Poster.insertMany(data.posters);

        await Stamp.deleteMany({});
        const createdStamp = await Stamp.insertMany(data.stamps);

        await Tag.deleteMany({});
        const createTag = await Tag.insertMany(data.tags);

        await PramotionalPro.deleteMany({});
        const createPramotionalPro = await PramotionalPro.insertMany(data.pramotionalproducts);

        await SustainablesItems.deleteMany({});
        const createSustainablesItems = await SustainablesItems.insertMany(data.sustainablesitems);

        await Speaker.deleteMany({});
        const createSpeaker = await Speaker.insertMany(data.speakers);

        await Pen.deleteMany({});
        const createPen= await Pen.insertMany(data.pens);

        await Mouse_Key.deleteMany({});
        const createMouse_Key= await Mouse_Key.insertMany(data.mouse_keyboards);

        await Rubikcubs.deleteMany({});
        const createRubikcubs= await Rubikcubs.insertMany(data.rubikcubs);

        await GlassTumb.deleteMany({});
        const createGlassTumb= await GlassTumb.insertMany(data.glasstumblers);

        await Desktop_Item.deleteMany({});
        const createDesktop_Item= await Desktop_Item.insertMany(data.desktopitems);



        // await User.deleteMany({});
        // const createdUsers = await User.insertMany(data.users);

        res.send({ createdProducts, createdTshirts, createdFrostedMugs, createdAwards, createdBadges, createdBags, createdMugs, createdCouplemugs, createdHotcoldsipper, createdDiary, createdTravelmug, createdMgnameplate, createdMousepad, createdMobilehold, createdClothing, createdPendrive, createdBearmug, createdMagicmug, createdStationeries, createdGiftset,  createdNoteDir, createdShotglass, createdNotebook, createdSingleawllsipper, createdPlasticsipper, createdCopperbottle, createdAntiskitbottles, createdBorosilicatesipper, createdBomboobottles, createdShakkerbottle, createdRoundmagbadge, createdPocmgbadge, createdMetalmgbadge, createdRoundpinbadge, createdAcrylicbadge, createdClipnamebadge, createdDombadge, createdOvalbadge, createdLaptopslv, createdPinnmplate, createdDomnmplate, createdMetalnmplate, createdAcrynmplate, createdTablelamp, createdDigital_Clock, createdPower_Bank, createdDigitalph_frame, createdPhoto_Frame, createdKeychain, createdLunchBox, createdKettle, createdCard_Holder, createdBest_Seller, createdFridge_Magnet, createdPaper_mug, createdCoaster, createdBand, createdBamboomug, createdBrochure, createdStandee, createdOccasion, createdPrinting, createdTeach_Acc,  createdSublimation_item, createdContainer, createdDesk_Stand, createdJutebag, createdTotebag, createdBagpack, createdCard_PenDrive, createdCalenders, createdFlyer_pamplate, createdBookmarks, createdFolder, createdMagzine, createdTrainingMannual, createdAnnual_Report, createdDocument_printing, createdProject_Report, createdSticker, createdNotepad, createdSipper, createdFamily, createdFullsleave_tshirt, createdGirls_tshirt, createdCouple_tshirt, createdSport_tshirt, createdPolo_tshirt, createdDry_fit_tshirt, createdHoodies, createdCap, createdWallet, createdCertificate, createdCushion_covers, createdMagnetic_photoframe, createdAcrylic_photo_frame, createdId_landyard, createdPencil, createdChechbook_Cover, createdClutches, createdSlingbag, createdTravelbag, createdSchoolbag, createdNon_wovenbag, createdWildcraft, createdHeadphone, createdLaptop_skin, createdMobile_accessories, createdMagnifire, createdCushion, createdBag_Wallet, createdBottle_sipper, createdGiftcard, createdPoster, createdStamp, createTag, createPramotionalPro, createSustainablesItems, createSustainablesItems, createSpeaker, createPen, createMouse_Key, createRubikcubs, createGlassTumb, createDesktop_Item });
    } catch (error) {
        console.error('Error seeding database:', error);  // Log the error for debugging
        res.status(500).send({ message: 'Error seeding database', error: error.message });
    }
});

module.exports = seedRouter;
