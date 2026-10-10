import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Coins,
  Backpack,
  Store,
  Compass,
  Check,
  Sparkles,
  Lock,
  Eye,
  Shield,
  Palette,
  Award,
  ChevronRight,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  EQUIPMENT_CATALOG,
  EquipmentCategory,
  EquipmentItem,
  EquipmentRarity
} from '../data/equipment';
import { useDepotStore } from '../lib/depotStore';
import { InteractiveCompass } from './InteractiveCompass';
import { InteractiveStampSeal } from './InteractiveStampSeal';
import { BinocularsViewerModal } from './BinocularsViewerModal';
import { AutumnLeaf } from './AutumnLeaf';

interface CaravanDepotModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'depot' | 'backpack';
}

export const CaravanDepotModal: React.FC<CaravanDepotModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'depot',
}) => {
  const [activeTab, setActiveTab] = useState<'depot' | 'backpack'>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [purchaseSuccessMessage, setPurchaseSuccessMessage] = useState<string | null>(null);
  const [showBinocularsModal, setShowBinocularsModal] = useState<boolean>(false);

  const {
    availableCoins,
    ownedIds,
    equipped,
    purchase,
    equip,
    getEquipped,
    isOwned,
    isEquipped,
  } = useDepotStore();

  if (!isOpen) return null;

  const equippedBinocular = getEquipped('binoculars');
  const equippedCompass = getEquipped('compass');
  const equippedStamp = getEquipped('stamp');
  const equippedTheme = getEquipped('theme');
  const equippedBadge = getEquipped('badge');

  const filteredItems = EQUIPMENT_CATALOG.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const getRarityBadge = (rarity: EquipmentRarity) => {
    switch (rarity) {
      case 'Legendary':
        return 'bg-amber-500/20 text-amber-700 border-amber-300 font-black';
      case 'Epic':
        return 'bg-purple-500/20 text-purple-700 border-purple-300 font-bold';
      case 'Rare':
        return 'bg-cyan-500/20 text-cyan-700 border-cyan-300 font-bold';
      case 'Common':
      default:
        return 'bg-stone-500/15 text-stone-700 border-stone-300 font-medium';
    }
  };

  const handlePurchaseClick = (item: EquipmentItem) => {
    const res = purchase(item);
    if (res.success) {
      setPurchaseSuccessMessage(res.message);
      setTimeout(() => setPurchaseSuccessMessage(null), 3500);
    } else {
      alert(res.message);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl bg-[#FFFDF9] rounded-3xl border border-[#DFD5CB] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-[#38281E]"
        >
          {/* Header Bar */}
          <div className="px-5 py-4 bg-gradient-to-r from-[#241A14] via-[#352419] to-[#2B1B12] text-white flex items-center justify-between gap-3 border-b border-[#4A3222] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FAF0E6]/10 border border-[#FAF0E6]/20 flex items-center justify-center text-[#E07A5F] shadow-inner">
                {activeTab === 'depot' ? <Store className="w-5 h-5" /> : <Backpack className="w-5 h-5" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-black tracking-tight font-display text-[#FAF6F0]">
                    {activeTab === 'depot' ? 'The Grand Caravan Depot' : 'Explorer Backpack & Loadout'}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-[#E07A5F]/20 text-[#F5C2B2] text-[10px] font-black uppercase tracking-wider border border-[#E07A5F]/30">
                    Tamil Nadu Guild
                  </span>
                </div>
                <p className="text-xs text-[#D4C3B4]">
                  {activeTab === 'depot'
                    ? 'Trade earned expedition coins for authentic field equipment, optics, & skins.'
                    : 'Manage equipped expedition tools, examine optics, and calibrate your heading.'}
                </p>
              </div>
            </div>

            {/* Wallet & Close */}
            <div className="flex items-center gap-3">
              <div
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border border-amber-400/40 flex items-center gap-2 shadow-inner"
                title="Your available explorer coins"
              >
                <Coins className="w-4 h-4 text-amber-400 animate-pulse" />
                <div className="flex flex-col text-right">
                  <span className="text-[10px] uppercase font-bold text-amber-200/80 leading-none">Coins</span>
                  <span className="text-sm font-black text-amber-300 leading-none font-mono">
                    {availableCoins}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition cursor-pointer"
                title="Close Depot"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="bg-[#FAF6F0] px-5 py-2.5 border-b border-[#E8DFD5] flex items-center justify-between gap-3 shrink-0 flex-wrap">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('depot')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'depot'
                    ? 'bg-[#C1512F] text-white shadow-xs'
                    : 'text-[#6E5A4E] hover:text-[#38281E] hover:bg-[#EFE7DE]'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Caravan Depot (Marketplace)</span>
              </button>

              <button
                onClick={() => setActiveTab('backpack')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'backpack'
                    ? 'bg-[#C1512F] text-white shadow-xs'
                    : 'text-[#6E5A4E] hover:text-[#38281E] hover:bg-[#EFE7DE]'
                }`}
              >
                <Backpack className="w-3.5 h-3.5" />
                <span>My Backpack ({ownedIds.length} Owned)</span>
              </button>
            </div>

            {/* Quick Tip */}
            <div className="text-[11px] text-[#8A7568] font-medium hidden sm:flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C1512F]" />
              <span>Coins are earned by completing real Tamil Nadu quests!</span>
            </div>
          </div>

          {/* Success Notification Banner */}
          {purchaseSuccessMessage && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-emerald-50 border-b border-emerald-200 px-5 py-2.5 flex items-center justify-between text-xs font-bold text-emerald-800"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{purchaseSuccessMessage}</span>
              </div>
              <button
                onClick={() => setPurchaseSuccessMessage(null)}
                className="text-emerald-700 hover:text-emerald-900 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {activeTab === 'depot' ? (
              // ==================== CARAVAN DEPOT MARKETPLACE ====================
              <div>
                {/* Category Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none">
                  {[
                    { id: 'all', label: 'All Caravan Gear', icon: Sparkles },
                    { id: 'binoculars', label: 'Vintage Optics', icon: Eye },
                    { id: 'compass', label: 'Compass Skins', icon: Compass },
                    { id: 'stamp', label: 'Passport Stamps', icon: Shield },
                    { id: 'theme', label: 'Parchment Themes', icon: Palette },
                    { id: 'badge', label: 'Travel Badges', icon: Award },
                  ].map((cat) => {
                    const IconComp = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                          selectedCategory === cat.id
                            ? 'bg-[#38281E] text-white shadow-2xs'
                            : 'bg-[#FAF6F0] text-[#6E5A4E] hover:bg-[#F2EBE1] border border-[#E8DFD5]'
                        }`}
                      >
                        <IconComp className="w-3.5 h-3.5" />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems.map((item, itIdx) => {
                    const owned = isOwned(item.id);
                    const active = isEquipped(item.id, item.category);
                    const canAfford = availableCoins >= item.price;

                    return (
                      <div
                        key={`${item.id}-${itIdx}`}
                        className={`rounded-2xl border p-4 transition-all flex flex-col justify-between ${
                          active
                            ? 'bg-[#FAF0E6] border-[#F1C6B7] ring-2 ring-[#C1512F]/20 shadow-sm'
                            : owned
                            ? 'bg-[#FAF6F0] border-[#E0D5C7]'
                            : 'bg-white border-[#E8DFD5] hover:border-[#D5C2B2] shadow-2xs'
                        }`}
                      >
                        <div>
                          {/* Top Row: Category & Rarity */}
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-[#8A7568]">
                              {item.category}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[9.5px] border uppercase ${getRarityBadge(
                                item.rarity
                              )}`}
                            >
                              {item.rarity}
                            </span>
                          </div>

                          {/* Center Visual Showcase */}
                          <div className="h-28 rounded-xl bg-gradient-to-b from-[#FAF6F0] to-[#F2EBE1] border border-[#EAE1D5] flex items-center justify-center p-2 mb-3 relative overflow-hidden">
                            {item.category === 'compass' ? (
                              <InteractiveCompass item={item} size="sm" interactive={false} />
                            ) : item.category === 'stamp' ? (
                              <InteractiveStampSeal item={item} size="sm" />
                            ) : (
                              <div className="flex flex-col items-center justify-center">
                                <span className="text-4xl filter drop-shadow-md select-none">
                                  {item.iconEmoji}
                                </span>
                                {item.category === 'theme' && (
                                  <span className="mt-1 text-[10px] font-mono text-[#8A7568]">
                                    Swatch: {item.accentColor}
                                  </span>
                                )}
                              </div>
                            )}

                            {active && (
                              <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-emerald-600 text-white text-[9.5px] font-bold flex items-center gap-1 shadow-xs">
                                <Check className="w-2.5 h-2.5" />
                                Active
                              </span>
                            )}
                          </div>

                          {/* Title & Lore */}
                          <h4 className="text-sm font-black text-[#38281E] font-display mb-1">
                            {item.name}
                          </h4>
                          <p className="text-xs text-[#6E5A4E] leading-relaxed mb-2.5 line-clamp-2">
                            {item.description}
                          </p>

                          {/* Perk Badge */}
                          <div className="p-2 rounded-lg bg-[#FAF0E6]/70 border border-[#F1C6B7]/60 text-[11px] font-bold text-[#8A4A2B] mb-3 flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-[#C1512F] shrink-0" />
                            <span className="truncate">{item.perk}</span>
                          </div>
                        </div>

                        {/* Action Row */}
                        <div className="pt-2 border-t border-[#EFE7DE] flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1">
                            <Coins className="w-3.5 h-3.5 text-amber-500" />
                            <span className="text-xs font-black font-mono text-[#38281E]">
                              {item.price === 0 ? 'Free Starter' : `${item.price} Coins`}
                            </span>
                          </div>

                          {active ? (
                            <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" />
                              <span>Equipped</span>
                            </span>
                          ) : owned ? (
                            <button
                              onClick={() => equip(item)}
                              className="px-3 py-1.5 rounded-xl bg-[#FAF0E6] hover:bg-[#FDF2EE] text-[#C1512F] text-xs font-black border border-[#F1C6B7] transition cursor-pointer"
                            >
                              Equip Item
                            </button>
                          ) : (
                            <button
                              onClick={() => handlePurchaseClick(item)}
                              disabled={!canAfford}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 transition cursor-pointer ${
                                canAfford
                                  ? 'bg-[#C1512F] hover:bg-[#A93F1F] text-white shadow-2xs active:scale-95'
                                  : 'bg-stone-200 text-stone-500 cursor-not-allowed border border-stone-300'
                              }`}
                            >
                              {!canAfford && <Lock className="w-3 h-3" />}
                              <span>{canAfford ? 'Unlock Gear' : `Need ${item.price - availableCoins} more`}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              // ==================== EXPLORER BACKPACK & LOADOUT ====================
              <div className="space-y-6">
                {/* 5 Active Loadout Slots Grid */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-[#8A7568] mb-3 flex items-center gap-1.5">
                    <Backpack className="w-4 h-4 text-[#C1512F]" />
                    <span>Active Expedition Loadout (5 Slots)</span>
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {[
                      { label: 'Binoculars', item: equippedBinocular, cat: 'binoculars' },
                      { label: 'Compass', item: equippedCompass, cat: 'compass' },
                      { label: 'Stamp', item: equippedStamp, cat: 'stamp' },
                      { label: 'Theme', item: equippedTheme, cat: 'theme' },
                      { label: 'Badge', item: equippedBadge, cat: 'badge' },
                    ].map((slot) => (
                      <div
                        key={slot.label}
                        className="p-3 rounded-2xl bg-gradient-to-br from-[#FAF0E6] to-[#FFFDF9] border border-[#F1C6B7] shadow-2xs text-center flex flex-col items-center justify-between"
                      >
                        <div className="text-[10px] uppercase font-black text-[#8A7568] mb-1">
                          {slot.label}
                        </div>
                        <div className="text-2xl my-1 select-none">{slot.item.iconEmoji}</div>
                        <div className="text-[11px] font-black text-[#38281E] truncate max-w-full">
                          {slot.item.name}
                        </div>
                        <div className="text-[9.5px] font-bold text-[#C1512F] mt-1 bg-[#FAF6F0] px-2 py-0.5 rounded-md border border-[#EFE8DF] truncate max-w-full">
                          {slot.item.perk}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Gear Testing Workbench */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF6F0] border border-[#DFD5CB] space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#38281E] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#C1512F]" />
                      <span>Interactive Field Workbench</span>
                    </h4>
                    <span className="text-[11px] text-[#8A7568] font-medium">
                      Test and calibrate your equipped instruments
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    {/* Interactive Compass Testing */}
                    <div className="p-4 rounded-xl bg-white border border-[#E0D5C7] flex flex-col items-center justify-center text-center">
                      <div className="text-xs font-black text-[#38281E] mb-2">
                        {equippedCompass.name}
                      </div>
                      <InteractiveCompass item={equippedCompass} size="md" interactive={true} />
                    </div>

                    {/* Interactive Binoculars Viewfinder Launcher */}
                    <div className="p-4 rounded-xl bg-white border border-[#E0D5C7] flex flex-col items-center justify-between text-center">
                      <div>
                        <div className="text-xs font-black text-[#38281E] mb-1">
                          {equippedBinocular.name}
                        </div>
                        <p className="text-[11px] text-[#6E5A4E] mb-3">
                          {equippedBinocular.description}
                        </p>
                      </div>

                      <div className="w-full flex flex-col items-center">
                        <span className="text-4xl my-2">{equippedBinocular.iconEmoji}</span>
                        <button
                          onClick={() => setShowBinocularsModal(true)}
                          className="w-full mt-2 py-2 rounded-xl bg-[#C1512F] hover:bg-[#A93F1F] text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-2xs transition cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Look Through Optics</span>
                        </button>
                      </div>
                    </div>

                    {/* Interactive Passport Stamp Press */}
                    <div className="p-4 rounded-xl bg-white border border-[#E0D5C7] flex flex-col items-center justify-between text-center">
                      <div>
                        <div className="text-xs font-black text-[#38281E] mb-1">
                          {equippedStamp.name}
                        </div>
                        <p className="text-[11px] text-[#6E5A4E] mb-2">
                          Click seal below to test official ink press.
                        </p>
                      </div>

                      <InteractiveStampSeal item={equippedStamp} size="md" />
                    </div>
                  </div>
                </div>

                {/* Full Owned Inventory Rack */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#8A7568] mb-3">
                    Backpack Inventory ({ownedIds.length} Unlocked Items)
                  </h4>

                  <div className="space-y-2">
                    {EQUIPMENT_CATALOG.filter((item) => isOwned(item.id)).map((item, owIdx) => {
                      const active = isEquipped(item.id, item.category);
                      return (
                        <div
                          key={`${item.id}-${owIdx}`}
                          className="p-3 rounded-xl bg-white border border-[#E8DFD5] flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{item.iconEmoji}</span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-black text-[#38281E] font-display">
                                  {item.name}
                                </span>
                                <span className="text-[9.5px] uppercase font-bold text-[#8A7568] px-1.5 py-0.2 bg-[#FAF6F0] rounded">
                                  {item.category}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#6E5A4E]">{item.perk}</p>
                            </div>
                          </div>

                          <div>
                            {active ? (
                              <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-black border border-emerald-200 flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                <span>Equipped</span>
                              </span>
                            ) : (
                              <button
                                onClick={() => equip(item)}
                                className="px-3 py-1 rounded-lg bg-[#FAF0E6] hover:bg-[#FDF2EE] text-[#C1512F] text-[11px] font-black border border-[#F1C6B7] transition cursor-pointer"
                              >
                                Equip
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-5 py-3.5 bg-[#FAF6F0] border-t border-[#E8DFD5] flex items-center justify-between gap-3 shrink-0">
            <span className="text-xs text-[#6E5A4E]">
              Equipped items customize your HUD, postcard minting, and field viewing.
            </span>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#38281E] hover:bg-[#251A13] text-white text-xs font-black transition cursor-pointer"
            >
              Close Backpack
            </button>
          </div>
        </motion.div>
      </div>

      {/* Binoculars Optical Recon Viewer Modal */}
      <BinocularsViewerModal
        isOpen={showBinocularsModal}
        onClose={() => setShowBinocularsModal(false)}
        equippedBinocular={equippedBinocular}
      />
    </AnimatePresence>
  );
};
