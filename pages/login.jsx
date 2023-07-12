import { ConnectWallet, useAddress, useUser, useContract, useOwnedNFTs, useLogin } from "@thirdweb-dev/react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { contractAddress, minimumBalance } from "../const/yourDetails"
export default function Login() {
  const address = useAddress(); // Get the user's address
  const { user, isLoggedIn } = useUser();
  console.log({user, isLoggedIn});
  const { isLoading:logginIn, login } = useLogin();
  const router = useRouter();
  const {
    contract,
    isLoading: loadingContract,
    error: errorLoadingContract,
  } = useContract(contractAddress);
  const { data: nfts, isLoading } = useOwnedNFTs(contract, address);

  useEffect(() => {
    if (!address) return;
    login();
  }, [address]);

  useEffect(() => {
    if (!user || !user.address) return;
    if (!nfts || nfts.length <= minimumBalance) 
      return console.log('User logged in but NFT not found');
    router.push('/the-page-of-your-choice');
  }, [user, nfts]);

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Auth - NFT Gated Content</h1>
      <p className={styles.explain}>
        Serve exclusive content to users who own an NFT from your collection,
        using{" "}
        <b>
          <a
            href="https://portal.thirdweb.com/building-web3-apps/authenticating-users"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.purple}
          >
            Auth
          </a>
        </b>
        !
      </p>

      <p className={styles.explain}>
        You cannot access the{" "}
        <Link className={styles.purple} href="/">
          main page
        </Link>{" "}
        unless you own an NFT from our collection!
      </p>

      <hr className={styles.divider} />

      <>
        {address ? (
          <p>
            Welcome, {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        ) : (
          <p>Please connect your wallet to continue.</p>
        )}

        <ConnectWallet accentColor="#F213A4" />
      </>
    </div>
  );
}
