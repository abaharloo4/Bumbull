import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockStore } from '../../store/mockStore';
import { PixelCard, PixelInput, PixelBadge, PixelButton } from '../../components/ui/PixelComponents';
import { Shield, Gift, AlertTriangle, Key } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, inviteCode, referrals, addReferral, logout } = useMockStore();

  const [redeemCode, setRedeemCode] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Password state
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passConfirm, setPassConfirm] = useState('');

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!redeemCode.trim()) return;

    if (redeemCode === inviteCode) {
      setErrorMsg('Cannot redeem your own invite code');
      setSuccessMsg('');
      return;
    }

    if (referrals.includes(redeemCode)) {
      setErrorMsg('Code already redeemed');
      setSuccessMsg('');
      return;
    }

    addReferral(redeemCode);
    setSuccessMsg('REFERRAL CODE ACCEPETED! ACCOUNT STATISTICS BOOSTED.');
    setErrorMsg('');
    setRedeemCode('');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPass || !newPass || !passConfirm) {
      setErrorMsg('All password fields are required');
      return;
    }
    if (newPass !== passConfirm) {
      setErrorMsg('New passwords do not match');
      return;
    }

    setSuccessMsg('PASSWORD UPDATED SUCCESSFULLY IN YOUR DATACARD!');
    setErrorMsg('');
    setOldPass('');
    setNewPass('');
    setPassConfirm('');
  };

  const handleDeactivate = () => {
    if (window.confirm('Are you sure you want to deactivate your Bumbull account? Your coordinates will be lost!')) {
      logout();
      navigate('/login');
    }
  };

  if (!currentUser) return null;

  return (
    <div className="flex-1 p-6 text-left font-mono select-none max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="font-pixel text-lg text-white mb-2">CONTROL PANEL</h1>
        <p className="font-mono text-xs text-muted">Adjust signals, security keys, and account rank</p>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 border-4 border-black bg-success/15 text-success font-pixel text-[9px] animate-pulse">
          SUCCESS: {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 p-4 border-4 border-black bg-red-500/10 text-[#f43f5e] font-pixel text-[9px]">
          ERROR: {errorMsg.toUpperCase()}
        </div>
      )}

      <div className="flex flex-col gap-8">
        {/* Account Details */}
        <PixelCard shadowVariant="default" className="p-6">
          <div className="flex items-center gap-3 mb-6 text-white border-b-2 border-black pb-3">
            <Key size={18} className="text-primary" />
            <h2 className="font-pixel text-xs">DATACARD SECURITY</h2>
          </div>
          <div className="flex flex-col gap-6">
            <PixelInput
              label="Phone Identifier (Read-Only)"
              value={currentUser.phone_number}
              disabled
              className="opacity-60 cursor-not-allowed bg-surface"
            />
            
            <form onSubmit={handlePasswordChange} className="flex flex-col gap-6 border-t-2 border-black/30 pt-6">
              <span className="font-pixel text-[8px] text-muted">CHANGE PASSWORD KEY</span>
              <PixelInput
                label="Old Password"
                type="password"
                placeholder="••••••••"
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
              />
              <div className="flex flex-col sm:flex-row gap-6">
                <PixelInput
                  label="New Password"
                  type="password"
                  placeholder="••••••••"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />
                <PixelInput
                  label="Confirm New Password"
                  type="password"
                  placeholder="••••••••"
                  value={passConfirm}
                  onChange={(e) => setPassConfirm(e.target.value)}
                />
              </div>
              <PixelButton type="submit" variant="secondary" size="sm" className="self-start">
                CHANGE PASSWORD
              </PixelButton>
            </form>
          </div>
        </PixelCard>

        {/* Membership Details */}
        <PixelCard shadowVariant="default" className="p-6">
          <div className="flex items-center gap-3 mb-6 text-white border-b-2 border-black pb-3">
            <Shield size={18} className="text-accent" />
            <h2 className="font-pixel text-xs">MEMBERSHIP RANK</h2>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-bg border-4 border-black p-4">
            <div className="text-left">
              <span className="font-pixel text-[9px] text-white block mb-1">CURRENT RANK STATUS</span>
              <p className="font-mono text-xs text-muted leading-relaxed max-w-sm">
                You are currently ranked in the default tier. Upgrading extends daily swipe limits and matching compatible ratios.
              </p>
            </div>
            <div className="shrink-0 flex flex-col items-center gap-2">
              <PixelBadge tier={currentUser.membership} />
              <a
                href="https://t.me/bumbullbot"
                target="_blank"
                rel="noreferrer"
                className="font-pixel text-[8px] text-primary hover:underline"
              >
                REQUEST UPGRADE
              </a>
            </div>
          </div>
        </PixelCard>

        {/* Invite & Referrals */}
        <PixelCard shadowVariant="default" className="p-6">
          <div className="flex items-center gap-3 mb-6 text-white border-b-2 border-black pb-3">
            <Gift size={18} className="text-success" />
            <h2 className="font-pixel text-xs">REFERRAL PROGRAM</h2>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-black bg-bg p-4 text-center">
                <span className="font-pixel text-[8px] text-muted block mb-2">MY REFERRALS</span>
                <span className="font-pixel text-xl text-white">{referrals.length}</span>
              </div>
              <div className="border-2 border-black bg-bg p-4 text-center">
                <span className="font-pixel text-[8px] text-muted block mb-2">INVITATION CODE</span>
                <span className="font-pixel text-xs text-accent tracking-wider block mt-1">{inviteCode}</span>
              </div>
            </div>

            <form onSubmit={handleRedeem} className="flex flex-col gap-4 border-t-2 border-black/30 pt-6">
              <span className="font-pixel text-[8px] text-muted">REDEEM FRIENDS CODE</span>
              <div className="flex gap-4 items-end">
                <PixelInput
                  placeholder="Enter 6-char code..."
                  value={redeemCode}
                  onChange={(e) => setRedeemCode(e.target.value)}
                />
                <PixelButton type="submit" variant="success" className="!py-3 text-black">
                  REDEEM
                </PixelButton>
              </div>
            </form>
          </div>
        </PixelCard>

        {/* Danger Zone */}
        <PixelCard shadowVariant="default" className="p-6 border-[#f43f5e] border-4">
          <div className="flex items-center gap-3 mb-6 text-white border-b-2 border-[#f43f5e] pb-3">
            <AlertTriangle size={18} className="text-[#f43f5e]" />
            <h2 className="font-pixel text-xs text-[#f43f5e]">DANGER ZONE</h2>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-red-500/5 border-2 border-[#f43f5e] p-4 text-left">
            <div>
              <span className="font-pixel text-[9px] text-[#f43f5e] block mb-1">DEACTIVATE CHARACTER</span>
              <p className="font-mono text-xs text-muted max-w-sm">
                Deactivating your datacard wipes your current active signals, coordinates, and conversation histories permanently.
              </p>
            </div>
            <PixelButton
              onClick={handleDeactivate}
              variant="danger"
              size="sm"
            >
              DEACTIVATE
            </PixelButton>
          </div>
        </PixelCard>
      </div>
    </div>
  );
};
