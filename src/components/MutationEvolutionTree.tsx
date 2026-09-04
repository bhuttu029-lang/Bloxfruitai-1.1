import React, { useState } from 'react';
import { 
  GitBranch, 
  Crown, 
  Sparkles, 
  Shield, 
  Flame, 
  Zap, 
  ArrowRight, 
  Check, 
  Lock,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';
import { soundFX } from '../utils/audio';
import { FRUIT_EVOLUTION_TREES, FruitEvolutionTree, EvolutionNode } from '../data/mutationEvolutionData';

interface MutationEvolutionTreeProps {
  onLoadAwakeningToLab: (fruitName: string, node: EvolutionNode) => void;
  onAskSensei?: (query: string) => void;
}

export const MutationEvolutionTree: React.FC<MutationEvolutionTreeProps> = ({
  onLoadAwakeningToLab,
  onAskSensei
}) => {
  const [selectedTree, setSelectedTree] = useState<FruitEvolutionTree>(FRUIT_EVOLUTION_TREES[0]);
  const [selectedNode, setSelectedNode] = useState<EvolutionNode>(FRUIT_EVOLUTION_TREES[0].evolutionBranch[3]);

  const handleSelectTree = (tree: FruitEvolutionTree) => {
    soundFX.playPop();
    setSelectedTree(tree);
    setSelectedNode(tree.evolutionBranch[tree.evolutionBranch.length - 1]);
  };

  const handleSelectNode = (node: EvolutionNode) => {
    soundFX.playPop();
    setSelectedNode(node);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-indigo-500/30 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-black uppercase tracking-wider mb-2">
              <GitBranch className="w-3.5 h-3.5" />
              <span>Awakening & Evolution Skill Trees</span>
            </div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <span>Branching Fruit Evolution & V3 Awakenings 🌳</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl mt-1">
              Explore step-by-step awakening progressions from Base form to Tier-3 Celestial Apex. Inspect fragment costs, unlockable passives, and load any evolution stage directly into the forge.
            </p>
          </div>
        </div>
      </div>

      {/* FRUIT SELECTOR PILLS */}
      <div className="flex flex-wrap gap-2">
        {FRUIT_EVOLUTION_TREES.map(tree => (
          <button
            key={tree.fruitId}
            onClick={() => handleSelectTree(tree)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer border ${
              selectedTree.fruitId === tree.fruitId
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400 shadow-lg'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
            }`}
          >
            <span className="text-lg">{tree.emoji}</span>
            <span>{tree.fruitName}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-purple-300 font-mono">
              {tree.tier}
            </span>
          </button>
        ))}
      </div>

      {/* EVOLUTION BRANCH & DETAIL VIEWER (2 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: STEP-BY-STEP EVOLUTION TIMELINE (7 COLS) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedTree.emoji}</span>
                <div>
                  <h3 className="text-lg font-black text-white">{selectedTree.fruitName} Awakening Path</h3>
                  <div className="text-xs text-indigo-300 font-semibold">{selectedTree.element}</div>
                </div>
              </div>
              <span className="text-xs italic text-slate-400 hidden sm:inline">{selectedTree.quote}</span>
            </div>

            {/* Step Timeline */}
            <div className="space-y-4 relative">
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-slate-700 via-indigo-500 to-cyan-400 hidden sm:block" />

              {selectedTree.evolutionBranch.map((node, idx) => {
                const isSelected = selectedNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => handleSelectNode(node)}
                    className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-indigo-950/60 border-indigo-400 ring-2 ring-indigo-500/50 shadow-xl'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-black shrink-0 ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40'
                          : 'bg-slate-950 text-slate-400 border border-slate-800'
                      }`}>
                        {node.icon}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black uppercase text-indigo-300">{node.stage}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 font-bold border border-slate-800">
                            {node.badge}
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-white">{node.name}</h4>
                        <div className="text-[11px] text-emerald-400 font-medium">
                          {node.unlockedMove}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 sm:self-center">
                      <div className="text-xs font-mono font-bold text-amber-400">
                        {node.fragmentCost === 0 ? 'Free (Base)' : `${node.fragmentCost.toLocaleString()} Frags`}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        Mastery: {node.masteryRequired}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: SELECTED NODE DEEP-DIVE & LAB EXPORT (5 COLS) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl bg-slate-950 border-2 border-indigo-500/50 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                {selectedNode.stage} Blueprint
              </span>
              <span className="text-2xl">{selectedNode.icon}</span>
            </div>

            <div>
              <h3 className="text-xl font-black text-white">{selectedNode.name}</h3>
              <div className="text-xs text-slate-400 mt-1">{selectedNode.description}</div>
            </div>

            {/* Stats & Perk Grid */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Unlocked Apex Move:</span>
                <span className="font-bold text-cyan-300 font-mono">{selectedNode.unlockedMove}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Passive Ability:</span>
                <span className="font-bold text-emerald-400">{selectedNode.passivePerk}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Stat Multiplier:</span>
                <span className="font-bold text-amber-400 font-mono">{selectedNode.statBonus}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Fragment Requirement:</span>
                <span className="font-bold text-purple-300 font-mono">
                  {selectedNode.fragmentCost === 0 ? '0 Fragments' : `${selectedNode.fragmentCost.toLocaleString()} Fragments`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Required Fruit Mastery:</span>
                <span className="font-bold text-white font-mono">Level {selectedNode.masteryRequired}</span>
              </div>
            </div>

            {/* Load Action Button */}
            <button
              onClick={() => {
                soundFX.playSuccess();
                onLoadAwakeningToLab(selectedTree.fruitName, selectedNode);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-black text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>Load "{selectedNode.name}" Into Mutation Sandbox</span>
            </button>

            {onAskSensei && (
              <button
                onClick={() => {
                  soundFX.playPop();
                  onAskSensei(`Explain how to unlock all raid awakening stages for ${selectedTree.fruitName} and what fragments are required for ${selectedNode.name}.`);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs border border-slate-800 transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask Solas AI For ${selectedTree.fruitName} Awakening Guide</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
