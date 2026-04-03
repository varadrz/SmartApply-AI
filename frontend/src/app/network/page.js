"use client";

import React from 'react';

export default function NetworkMap() {
  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Central Map View */}
      <section className="flex-1 relative bg-surface-container-lowest overflow-hidden">
        {/* Grid Background Overlay */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}
        ></div>
        
        {/* Connection Map Visualization (Simulated) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Central Node (User) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="w-4 h-4 bg-white rounded-full node-pulse ring-8 ring-white/5 animate-[pulse_3s_ease-in-out_infinite]"></div>
              <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-surface-container-high px-2 py-1 rounded text-[10px] font-bold border border-white/10 uppercase tracking-widest text-white">You</div>
            </div>
            
            {/* Company Clusters */}
            {/* NVIDIA Cluster */}
            <div className="absolute top-1/4 left-1/4">
              <div className="w-16 h-16 border border-tertiary/20 rounded-full flex items-center justify-center obsidian-glass relative">
                <span className="text-tertiary text-xs font-black">NVIDIA</span>
                {/* Connection Lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                  <line opacity="0.2" stroke="white" strokeDasharray="4" strokeWidth="0.5" x1="50%" x2="250%" y1="50%" y2="250%"></line>
                </svg>
              </div>
              {/* Individual Nodes */}
              <div className="absolute -top-8 -left-8 w-8 h-8 rounded-full border border-white/20 obsidian-glass p-1">
                <img className="rounded-full grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Node" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP5OvB78Ynf5JsCePQZbxcFRCgco8ACWOldVrAdQtrNNt69oCVfHR_fXm7A6-jnQYmAJDg0zz0U6cjOX0CDwZt6dmO2kWXZqoEUKzjpoRoW0GZKJz2nS1qhygoxR3xRmhItiRaPXd_Q-83WUSN1JP170Xc58IPsDB4dQG0McKrbzQBzmF7LbJ2hXH-fwUEluKJnbj9whcDsjJr_RV2jTak_AAP5EJO8ehDTBd6MnvxSoXr3PXPgRPw8b_s12tWHpowG3Qkl7AfQpc"/>
              </div>
              <div className="absolute -bottom-4 -right-10 w-10 h-10 rounded-full border border-tertiary/40 obsidian-glass p-1">
                <img className="rounded-full grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Node" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArRPfIVueqxKYXudoOrdwzs0jKEw097qoyONdYnPrTT1QvBAf6tX8H0J3uzuFqTgQpFa9vM-QUXObMISI4-0zmFqW-RyONAJDHJZGJw8e85JXG9j737StD4vF47STCLN1C3zjTQgx_9s0tFgVgQz7KFclARIMATserft0JZIkgr2RpNlPb4GRMJ-FZpcmbyo5pg7KwbWj-6NVW07ryie3-HiwUs5mF8bkTDz0cYGbWmsUyvi8FM4Xwb6RDVLxffhm6_u6mcVlo8Ps"/>
              </div>
            </div>
            
            {/* OpenAI Cluster */}
            <div className="absolute bottom-1/4 right-1/4">
              <div className="w-20 h-20 border border-white/20 rounded-full flex items-center justify-center obsidian-glass">
                <span className="text-white text-xs font-black">OPENAI</span>
              </div>
              <div className="absolute top-12 -right-12 w-8 h-8 rounded-full border border-white/20 obsidian-glass p-1">
                <img className="rounded-full grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Node" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoVw6zPKTuA9OW8DlSMFJ6Fp2omLIs_cger7KGPCtM34Z02xz-vvFK0NWtxHrvVmgAeIyyub954JPQHxbo95yUzP_rRenuSK-wqHJKVY0iciymYIfCePpcpwrJ6f0amyxk2QvvIDQouxvDB33WL2BZM62neid-avdN0NsK2PBzSQCpnPC0gVgSzMl6USEaXNCGE7EedLSH_ws6pCaABQNDqXv6ORSGBUAsWwFvK7feORwy3bipiAAQkCBai-eCQtRrXLR45e2MMpQ"/>
              </div>
              <div className="absolute -bottom-10 left-2 w-9 h-9 rounded-full border border-tertiary/40 obsidian-glass p-1">
                <img className="rounded-full grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Node" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBosCm1ILhf96uYizdtF--c_crtV6Bigfp7y5gqCECcjSv8Cx7y-lITuqqmDPfK2FmWknIvREhz2OFn-ghoHAz1d0wu9Hbjkv3mPudhwc2305F-TuOMJXcY5fPo6VxqnpyfpiqYNQlyJ3xYJKEtlfwcqFyM8_7P0z2kG4gGBfsJ47Io1X7Ae4_JoHRYWqhUnjQs1lYHmeh-jGK0x_8YPrz8Mvo2aG_CndgC2321c_H9NcXQwJ0wrZU2C6CWwgofrUK9k7I5UYBuS5k"/>
              </div>
            </div>
            
            {/* DeepScale Cluster */}
            <div className="absolute top-1/3 right-1/4">
              <div className="w-14 h-14 border border-outline-variant/30 rounded-full flex items-center justify-center obsidian-glass">
                <span className="text-outline text-[10px] font-black">DEEPSCALE</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Controls Overlay */}
        <div className="absolute bottom-8 left-8 flex space-x-2">
          <div className="bg-surface-container obsidian-glass p-1 rounded-lg flex border border-outline-variant/10">
            <button className="p-2 hover:bg-surface-bright rounded transition-colors text-on-surface-variant hover:text-white"><span className="material-symbols-outlined text-sm">add</span></button>
            <button className="p-2 hover:bg-surface-bright rounded transition-colors text-on-surface-variant hover:text-white"><span className="material-symbols-outlined text-sm">remove</span></button>
            <div className="w-px bg-outline-variant/20 mx-1"></div>
            <button className="p-2 hover:bg-surface-bright rounded transition-colors text-on-surface-variant hover:text-white"><span className="material-symbols-outlined text-sm">filter_center_focus</span></button>
          </div>
          <div className="bg-surface-container obsidian-glass px-3 py-2 rounded-lg flex items-center space-x-3 border border-outline-variant/10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Layer:</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-tertiary">1st & 2nd Degree</span>
          </div>
        </div>
      </section>

      {/* Sidebar: High-Value Referral Targets */}
      <aside className="w-96 bg-surface-container-low flex flex-col border-l border-outline-variant/20 h-[calc(100vh-4rem)]">
        <div className="p-6 border-b border-outline-variant/10">
          <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-white">
            <span className="material-symbols-outlined text-tertiary text-lg">target</span>
            High-Value Referral Targets
          </h2>
          <p className="text-xs text-outline mt-1 font-body">Identified AI-intent connections at target firms.</p>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
          {/* Target Card 1 */}
          <div className="group bg-surface-container rounded-lg p-4 border border-transparent hover:border-tertiary/20 hover:bg-surface-bright transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img className="w-12 h-12 rounded-lg object-cover" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN4BLM99l1YLIQJ32OX2s8W8oJ_zbu-YTDVeYhcbaYINSPnXgUW1lhDGEtw1aI_9c6GOyNrcbXXd4L5Spn7CZiCqgSyjj5uVWhB3rQsd2VrF1pzvazDNcxRboledQ5JwEpQBVn6lsSuXackaInQVUuIbTC_CGnKNBVnMb7i3AuFVGNgSu77VRFCgFasslrrDFQMgYipsZA73mC2-jqPpwMHkN7QAm1eYZhs2STt-IU4jAymWlF0Eu4jPgRUedWjTUs5fkW-erbw-8"/>
                  <div className="absolute -bottom-1 -right-1 bg-tertiary text-on-tertiary px-1 rounded text-[8px] font-black uppercase">2nd</div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-none">Sarah Chen</h3>
                  <p className="text-[10px] text-outline mt-1 font-medium">Sr. Engineering Manager, OpenAI</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-1 px-2 py-1 bg-tertiary/10 rounded-full">
                  <span className="material-symbols-outlined text-[10px] text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
                  <span className="text-[10px] font-bold text-tertiary">92%</span>
                </div>
                <span className="text-[8px] text-outline mt-1 uppercase tracking-tighter">Success Prob.</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex -space-x-2">
                <img className="w-5 h-5 rounded-full border border-surface-container" alt="Small Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLnBvuIdX2Zcp_nuGF7WEcDOlUSWeTexBhGWu-wBTr6Lhan8ci_tQY_EhZ4cZG-guqXQkNXTlWtN_phobDCh1KiLg46Dcold593M6NdYJnamVNt8DWnZ3CIC7P-Q1GPiZYuH88AiCbfj_HRmJqgTefRNbB3ofTU9UBfv-xkHp6ifcDbje0Nr8uPD_Zmueslch76ayOU00wkEANAxvxl743u8SB0h17i2iG8EVi3IlSp3bGY1s-cZlXU56YkfrqDBqZX3NC3PfKuBw"/>
                <img className="w-5 h-5 rounded-full border border-surface-container" alt="Small Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaZPO6bJo1Npqr9uqOXBjg79rI1OUm414BC8P60HAcvqJPE3oF3doiiQAyfnVu_9LPe-V1fAC5huQD_sH2jBfGBCOODkp5B9C1JaUfGFdt9Z90SfefySAwXdoKafJz3dadRyQ3tyHoUcGZEzFiQePcCuepH-J32hcktZVl5nNnSWwA_NxQlG1y1or7bkTn2vq-h-ty_QufPwUhK20t1aVmvFR-wAcFtwrsq1MPm4SxY2AzE3XXmAma4J9OadeUF945uXwmoS91wng"/>
              </div>
              <span className="text-[10px] text-on-surface-variant font-medium">2 shared connections including Alex Rivera</span>
            </div>
            <button className="w-full py-2 bg-white text-on-primary-container text-[10px] font-bold uppercase tracking-widest rounded-md hover:bg-tertiary transition-colors flex items-center justify-center gap-2 active:scale-95">
              <span className="material-symbols-outlined text-xs">auto_awesome</span>
              Generate Referral Request
            </button>
          </div>

          {/* Target Card 2 */}
          <div className="group bg-surface-container rounded-lg p-4 border border-transparent hover:border-tertiary/20 hover:bg-surface-bright transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img className="w-12 h-12 rounded-lg object-cover" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgJByF19Njmilea1ILb0Xb8ZRhWItfAzqgcwmiRA4baSj4p1-SlergC_CDrbvflygZVkFwoKBZ3roSaF6TJHr8sg0X-SpUNYnQhj8ia9hziVgjOa9SbxEC76dVtCBGRn4VisuLolDjYWO9KpWvf2klPGMCW6HyOqwRw0UtaS6tIIKetgEAp9s3Jvju4vwpCPROUHewEkUCPvYcwOQCJIeYHiFRtLMRg4Mm1r1NDlKaNdJYQvgrAjIiffDiItw4iX1S3ex-2hCxT5A"/>
                  <div className="absolute -bottom-1 -right-1 bg-outline-variant text-white px-1 rounded text-[8px] font-black uppercase">1st</div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-none">Jameson Holt</h3>
                  <p className="text-[10px] text-outline mt-1 font-medium">Lead Technical Recruiter, NVIDIA</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-1 px-2 py-1 bg-tertiary/10 rounded-full">
                  <span className="material-symbols-outlined text-[10px] text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
                  <span className="text-[10px] font-bold text-tertiary">78%</span>
                </div>
                <span className="text-[8px] text-outline mt-1 uppercase tracking-tighter">Success Prob.</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] text-on-surface-variant font-medium">Direct connection — Active 2h ago</span>
            </div>
            <button className="w-full py-2 bg-white text-on-primary-container text-[10px] font-bold uppercase tracking-widest rounded-md hover:bg-tertiary transition-colors flex items-center justify-center gap-2 active:scale-95">
              <span className="material-symbols-outlined text-xs">auto_awesome</span>
              Generate Referral Request
            </button>
          </div>

          {/* Target Card 3 */}
          <div className="group bg-surface-container rounded-lg p-4 border border-transparent hover:border-tertiary/20 hover:bg-surface-bright transition-all duration-300 opacity-60 hover:opacity-100">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img className="w-12 h-12 rounded-lg object-cover" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ3V_3X9RPX28ILG220OZysSymtklnXL-CsK2-aCzfB2w_tmioXgahlhO4wHRHUpAZtUR_2RzV1n6DgbVM-dxkKk4xW37dIoZwy4tAMZYG5rC3_tai0oZH4yF2UD3mm-fhKL94_ZXaOL84xjk2aUNkzwbCcPx8p23ZxZ1njnCsO0nDVwSJJajGEExFKFqMj_-fESCXLCI1hjC-8btGj-wkHduRc4W7SDPQ_T1hlp9LT2RIUCLrzMF6E8poA63y5jJuwMbwz0KYLJA"/>
                  <div className="absolute -bottom-1 -right-1 bg-tertiary text-on-tertiary px-1 rounded text-[8px] font-black uppercase">2nd</div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-none">Marcus Thorne</h3>
                  <p className="text-[10px] text-outline mt-1 font-medium">CTO, DeepScale</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-1 px-2 py-1 bg-error-container/20 rounded-full">
                  <span className="material-symbols-outlined text-[10px] text-error" style={{fontVariationSettings: "'FILL' 1"}}>analytics</span>
                  <span className="text-[10px] font-bold text-error">45%</span>
                </div>
                <span className="text-[8px] text-outline mt-1 uppercase tracking-tighter">Success Prob.</span>
              </div>
            </div>
            <button className="w-full py-2 border border-outline-variant/30 text-white text-[10px] font-bold uppercase tracking-widest rounded-md hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 active:scale-95">
              View Network Path
            </button>
          </div>
        </div>

        {/* Sidebar Footer Intel */}
        <div className="p-6 bg-surface-container-lowest border-t border-outline-variant/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-outline">Network Coverage</span>
            <span className="text-[10px] font-bold text-tertiary">Optimum</span>
          </div>
          <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
            <div className="bg-tertiary h-full w-[84%]"></div>
          </div>
        </div>
      </aside>
    </div>
  );
}
