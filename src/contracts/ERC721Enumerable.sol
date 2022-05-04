// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721.sol';

contract ERC721Enumerable is ERC721 {

    uint256[] private _allTokens;
    // tokenIds => index position of the _allTokens
    mapping(uint256 => uint256) private _allTokensIndex;
    // owner => owned tokenIds array
    mapping(address => uint256[]) private _ownedTokens;
    // Token Ids => index position of the _ownedTokens list
    mapping(uint256 => uint256) private _ownedTokensIndex;


    function totalSupply() external view returns (uint256) {
        return _allTokens.length;
    }

    /**
     * @dev Returns a token ID at a given `index` of all the tokens stored by the contract.
     * Use along with {totalSupply} to enumerate all tokens.
     */
    function tokenByIndex(uint256 index) external view returns (uint256) {
        // require(index < totalSupply(), 'ERC721Enumerable:tokenByIndex invalid_index');
        require(index < _allTokens.length, 'ERC721Enumerable:tokenByIndex invalid_index');

        return _allTokensIndex[index];
    }

    /**
     * @dev Returns a token ID owned by `owner` at a given `index` of its token list.
     * Use along with {balanceOf} to enumerate all of ``owner``'s tokens.
     */
    function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256) {
        require(index < balanceOf(owner), 'ERC721Enumerable:tokenOfOwnerByIndex invalid_index');
        return _ownedTokens[owner][index];
    }

    function _mint(address to, uint256 _tokenId) internal override(ERC721) {
        super._mint(to, _tokenId);
        _addTokensToAllTokenEnumerable(_tokenId);
        _addTokensToOwnerEnumerable(to, _tokenId);

    }

    function _addTokensToOwnerEnumerable(address _owner, uint256 _tokenId) private {
        _ownedTokens[_owner].push(_tokenId);
        _ownedTokensIndex[_tokenId] = _ownedTokens[_owner].length;
    }

    function _addTokensToAllTokenEnumerable(uint256 _tokenId) private {
        _allTokens.push(_tokenId);
        _allTokensIndex[_tokenId] = _allTokens.length - 1;
    }

}
