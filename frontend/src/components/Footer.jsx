import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '12px',
        color: '#c7d5e0',
        backgroundColor: '#171a21',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <div>
        © {new Date().getFullYear()} MTEAM
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <a
          href="https://github.com/repos"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#c7d5e0' }}
        >
          <GitHubIcon />
        </a>

        <a
          href="https://www.linkedin.com/in/muhammed-mustafa-ilter-021893389?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B6OsRnVLyRRW0o3O32fkTSA%3D%3D"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#c7d5e0' }}
        >
          <LinkedInIcon />
        </a>
      </div>
    </div>
  );
}

export default Footer;
