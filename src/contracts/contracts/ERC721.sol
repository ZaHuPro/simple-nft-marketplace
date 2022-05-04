// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC721 {
    /**
     * @dev Emitted when `tokenId` token is transferred from `from` to `to`.
     */
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    /**
     * @dev Emitted when `owner` enables `approved` to manage the `tokenId` token.
     */
    event Approval(
        address indexed owner,
        address indexed approved,
        uint256 indexed tokenId
    );

    /**
     * @dev Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets.
     */
    event ApprovalForAll(
        address indexed owner,
        address indexed operator,
        bool approved
    );

    // Mapping from token ID to owner address
    mapping(uint256 => address) private _tokenOwner;
    // Mapping owner address to token count
    mapping(address => uint256) private _ownedTokensCount;
    // Mapping from token ID to approved address
    mapping(uint256 => address) private _tokenApprovals;
    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    constructor() {}

    function balanceOf(address owner) public view returns (uint256) {
        require(owner != address(0), "ERC721:balanceOf invalid_address");

        return _ownedTokensCount[owner];
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        require(_exists(tokenId), "ERC721:ownerOf invaildtokenId");

        address owner = _tokenOwner[tokenId];

        require(owner != address(0), "ERC721:ownerOf invalid_address");

        return owner;
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        address owner = _tokenOwner[tokenId];
        return owner != address(0);
    }

    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0), "ERC721:_mint invalid_address");
        require(!_exists(tokenId), "ERC721:_mint tokenId_already_minted");

        _tokenOwner[tokenId] = to;
        _ownedTokensCount[to] += 1;

        emit Transfer(address(0), to, tokenId);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external payable {
        require(
            from != address(0),
            "ERC721:transferFrom::from invalid_address"
        );
        require(to != address(0), "ERC721:transferFrom::to invalid_address");
        require(_exists(tokenId), "ERC721:ownerOf invaildtokenId");
        require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721: transfer caller is not owner nor approved");
        // require(ownerOf(tokenId) == from, "ERC721:transferFrom your_not_owner");

        _ownedTokensCount[from] -= 1;
        _tokenOwner[tokenId] = to;
        _ownedTokensCount[to] += 1;

        emit Transfer(from, to, tokenId);
    }

    function approve(address to, uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        require(to != owner, "ERC721:approve approval_to_current_owner");
        require(msg.sender == owner, "ERC721:approve sender_not_a_owner");

        _tokenApprovals[tokenId] = to;

        emit Approval(owner, to, tokenId);
    }


    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return _operatorApprovals[owner][operator];
    }

function setApprovalForAll(address operator, bool approved) public {
        require(msg.sender != operator, "ERC721: approve to caller");
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function getApproved(uint256 tokenId)
        public
        view
        returns (address)
    {
        require(
            _exists(tokenId),
            "ERC721: approved query for nonexistent token"
        );

        return _tokenApprovals[tokenId];
    }

    function _isApprovedOrOwner(address spender, uint256 tokenId)
        internal
        view
        returns (bool)
    {
        require(_exists(tokenId), "ERC721:ownerOf invaildtokenId");
        address owner = ownerOf(tokenId);
        return (spender == owner ||
            getApproved(tokenId) == spender ||
            isApprovedForAll(owner, spender));
    }
}
